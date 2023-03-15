import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';

interface RouteParams {
    volume: number;
    weight: number;
    serviceType: string;
    cost: number;
    cargoType: string;
    placesAmount: number;
}

// interface RouteScreenProps {
//     route: { params: RouteParams };
//     navigation: any;
// };
// const navigation = useNavigation();


// export default function RouteScreen({ route, navigation }: RouteScreenProps) {
export default function RouteScreen({ route }: { route: { params: RouteParams } }) {


    const { volume, weight, serviceType, cost, cargoType, placesAmount } = route.params;
    const [citySender, setCitySender] = useState("0df25497-4b3a-11e4-ab6d-005056801329");
    const [cityRecipient, setCityRecipient] = useState("6dbe5985-96d1-11ea-a970-b8830365ade4");
    const [result, setResult] = useState("");

    const apiKey = "c762593886e528bd8e7336abce62a78d";
    const novaPoshtaApiUrl = "https://api.novaposhta.ua/v2.0/json/";

    const handleNovaPostRequest = () => {
        const modelName = "InternetDocument";
        const calledMethod = "getDocumentPrice";
        const methodProperties = {
            CitySender: citySender,
            CityRecipient: cityRecipient,
            Weight: weight,
            ServiceType: serviceType,
            Cost: cost,
            CargoType: cargoType,
            SeatsAmount: placesAmount,
            VolumeGeneral: volume,
        };
        fetch(novaPoshtaApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey,
                modelName,
                calledMethod,
                methodProperties,
            }),
        })
            .then((response) => response.json())
            .then((data) => setResult(JSON.stringify(data)))
            .catch((error) => Alert.alert("Ошибка", error.message))
    }

    const handleClearAll = () => {
        setCitySender("0df25497-4b3a-11e4-ab6d-005056801329");
        setCityRecipient("6dbe5985-96d1-11ea-a970-b8830365ade4");
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
                <Text style={styles.unit}>откуда</Text>
                <TextInput
                    style={styles.input}
                    value={citySender}
                    onChangeText={setCitySender}
                    placeholder="Введите город отправления"
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.unit}>куда</Text>
                <TextInput
                    style={styles.input}
                    value={cityRecipient}
                    onChangeText={setCityRecipient}
                    placeholder="Введите город назначения"
                />
            </View>
        <View style={styles.inputView}>
            <Text>{result}</Text>
        </View>
        <View style={styles.button}>
            <Button
                title="Submit"
                onPress={()=>{
                    handleNovaPostRequest();
                    // navigation.navigate('Result');
                }}
            />
        </View>
        <Text style={styles.message}>Введите путь</Text>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:-400,
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
