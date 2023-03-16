import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from "react";
import axios from 'axios';

interface RouteParams {
    volume: number;
    weight: number;
    serviceType: string;
    cost: number;
    cargoType: string;
    placesAmount: number;
}

export default function RouteScreen({ route }: { route: { params: RouteParams } }) {
    const [citySenderRef, setCitySenderRef] = useState<string | null>(null);
    const [cityRecipientRef, setCityRecipientRef] = useState<string | null>(null);
    const [cityNameSender, setCityNameSender] = useState("");
    const [cityNameRecipient, setCityNameRecipient] = useState("");
    const [result, setResult] = useState("");

    const apiKey = "c762593886e528bd8e7336abce62a78d";
    const novaPoshtaApiUrl = "https://api.novaposhta.ua/v2.0/json/";

    const getCityRefByName = async (cityName: string) => {
        const modelName = "Address";
        const calledMethod = "searchSettlements";
        const methodProperties = {
            CityName: cityName,
            Limit: 1,
        };
        try {
            const response = await axios.post(novaPoshtaApiUrl, {
                apiKey,
                modelName,
                calledMethod,
                methodProperties,
            });
            console.log(`Nova Poshta API searchSettlements request for ${cityName} successful!`);
            console.log("Result data:", response.data);
            const cityRef = response.data?.data?.[0]?.Addresses?.[0]?.Ref;
            // const cityRef = response.data.data[0].Ref;
            console.log("CityRef:", cityRef);
            return cityRef;
        } catch (error) {
            console.log(`Nova Poshta API searchSettlements request for ${cityName} failed!`);
            console.log("Error:", error);
            Alert.alert("Ошибка", error?.message);
            return null;
        }
    };

    const handleNovaPostRequest = async () => {
        if (!citySenderRef) {
            const senderRef = await getCityRefByName(cityNameSender);
            if (senderRef) {
                setCitySenderRef(senderRef);
                // setCitySenderRef(cityNameSender);
                // setCityNameSender(senderRef);
                console.log(senderRef)
            } else {
                return;
            }
        }
        if (!cityRecipientRef) {
            const recipientRef = await getCityRefByName(cityNameRecipient);
            if (recipientRef) {
                setCityRecipientRef(recipientRef);
                // setCityRecipientRef(cityNameRecipient);
                // setCityNameRecipient(recipientRef);
                console.log(recipientRef)
            } else {
                return;
            }
        }
        const modelName = "InternetDocument";
        const calledMethod = "getDocumentPrice";
        const methodProperties = {
            CitySender: citySenderRef,
            CityRecipient: cityRecipientRef,
            Weight: route.params.weight,
            ServiceType: route.params.serviceType,
            Cost: route.params.cost,
            CargoType: route.params.cargoType,
            SeatsAmount: route.params.placesAmount,
            VolumeGeneral: route.params.volume,
        };
        try {
            const response = await axios.post(novaPoshtaApiUrl, {
                apiKey,
                modelName,
                calledMethod,
                methodProperties,
            });
            console.log("Nova Poshta API request successful!");
            console.log("Result data:", response.data);
            setResult(JSON.stringify(response.data));
        } catch (error) {
            console.log("Nova Poshta API request failed!");
            console.log("Error:", error);
            Alert.alert("Ошибка", error?.message);
        }
    };

    const handleClearAll = () => {
        setCitySenderRef(null);
        setCityRecipientRef(null);
        setCityNameSender("");
        setCityNameRecipient("");
        setResult("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button
                    title="ClearAll"
                    onPress={handleClearAll}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.unit}>Откуда</Text>
                <TextInput
                    style={styles.input}
                    value={cityNameSender}
                    onChangeText={async (text) => {
                        setCityNameSender(text);
                        // setCitySenderRef(null);
                    }}
                    placeholder="Введите город отправления"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.unit}>Куда</Text>
                <TextInput
                    style={styles.input}
                    value={cityNameRecipient}
                    onChangeText={async (text) => {
                        setCityNameRecipient(text);
                        // setCityRecipientRef(null);
                    }}
                    placeholder="Введите город назначения"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.input}>
                    {result && JSON.parse(result)?.data?.[0]?.Cost}
                </Text>
            </View>
            <View style={styles.button}>
                <Button
                    title="Submit"
                    onPress={handleNovaPostRequest}
                />
            </View>
            <Text style={styles.message}>Введите путь</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        backgroundColor: "#ddd",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        margin: 2,
        opacity: 0.9,
    },
    input: {
        margin: 10,
        flex: 1,
        color: "#0C1F1F",
        textAlign: "right",
    },
    unit: {
        marginHorizontal: 5,
        color: "#0C1F1F",
    },
    button: {
        backgroundColor: '#ddd',
        color: '#FFFFFF',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        opacity: 0.9,
    },
    message:{
        fontSize:30,
        opacity:0.5,
    }
});