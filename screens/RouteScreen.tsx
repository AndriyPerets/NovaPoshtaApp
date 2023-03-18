import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../navigation/MainNavigator";

type Props = BottomTabScreenProps<BottomTabParamList, 'Route'>;

export default function RouteScreen({route}: Props) {
  const [citySenderRef, setCitySenderRef] = useState<string>("");
  const [cityRecipientRef, setCityRecipientRef] = useState<string>("");
  const [cityNameSender, setCityNameSender] = useState("Киев");
  const [cityNameRecipient, setCityNameRecipient] = useState("Львов");
  const [result, setResult] = useState("");
  const {weight, volume, serviceType, cargoType, placesAmount, cost} = route.params;

  const apiKey = "c762593886e528bd8e7336abce62a78d";
  const novaPoshtaApiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const handleNovaPostRequest = async () => {
    if (!citySenderRef || !cityRecipientRef) {
      console.log("City references are not set yet!");
      return;
    }

    const modelName = "InternetDocument";
    const calledMethod = "getDocumentPrice";
    const methodProperties = {
      CitySender: citySenderRef,
      CityRecipient: cityRecipientRef,
      Weight: weight,
      ServiceType: serviceType,
      Cost: cost,
      CargoType: cargoType,
      SeatsAmount: placesAmount,
      VolumeGeneral: volume,
    };

    try {
      // Make the Nova Poshta API request
      const response = await axios.post(novaPoshtaApiUrl, {
        apiKey,
        modelName,
        calledMethod,
        methodProperties,
      });
      console.log("Nova Poshta API request successful!");
      console.log("Result data:", response.data);
      const newResult = response.data?.data?.[0]?.Cost || 0;
      setResult(JSON.stringify(newResult));
    } catch (error: any) {
      console.log("Nova Poshta API request failed!");
      console.log("Error:", error);
      Alert.alert("Ошибка", error?.message);
    }
  };


  const getCitySenderRefByName = async (cityName: string) => {
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
      console.log("CityRef:", cityRef);
      setCitySenderRef(cityRef);
      console.log("citySenderRef:", citySenderRef)
    } catch (error: any) {
      console.log(`Nova Poshta API searchSettlements request for ${cityName} failed!`);
      console.log("Error:", error);
      Alert.alert("Ошибка", error?.message);
      return null;
    }
  };
  const getCityRecipientRefByName = async (cityName: string) => {
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
      console.log("CityRef:", cityRef);
      setCityRecipientRef(cityRef);
      console.log("cityRecipientRef:", cityRecipientRef)
    } catch (error: any) {
      console.log(`Nova Poshta API searchSettlements request for ${cityName} failed!`);
      console.log("Error:", error);
      Alert.alert("Ошибка", error?.message);
      return null;
    }
  };

  useEffect(() => {
    if (citySenderRef && cityRecipientRef) {
      handleNovaPostRequest();
    }
  }, [citySenderRef, cityRecipientRef]);

  const submitButton = async () => {
    await getCitySenderRefByName(cityNameSender);
    await getCityRecipientRefByName(cityNameRecipient);
  }

  const handleClearAll = () => {
    setCitySenderRef("");
    setCityRecipientRef("");
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
          }}
          placeholder="Введите город назначения"
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.input}>
          {result}
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          title="Submit"
          onPress={submitButton}
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
  message: {
    fontSize: 30,
    opacity: 0.5,
  }
});
