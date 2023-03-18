import {useState} from "react";
import {TextInput, View, StyleSheet, Text, Button} from "react-native";
import RouteScreen from "../screens/RouteScreen";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {MainStackParamList} from "../navigation/MainNavigator";

type Props = BottomTabScreenProps<MainStackParamList, 'Weight'>;

export default function WeightScreen({navigation}: Props) {
  const [weight, setWeight] = useState("0.1");
  const [serviceType, setServiceType] = useState("WarehouseWarehouse");
  const [cost, setCost] = useState("300");
  const [cargoType, setCargoType] = useState("Parcel");
  const [placesAmount, setPlacesAmount] = useState("1");

  const handleClearAll = () => {
    setWeight("0.1");
    setServiceType("WarehouseWarehouse");
    setCost("300");
    setCargoType("Parcel");
    setPlacesAmount("1")
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
        <Text style={styles.unit}>вес</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Text style={styles.unit}>кг</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.unit}>тип услуги</Text>
        <TextInput
          style={styles.input}
          value={serviceType}
          onChangeText={(text) => setServiceType(text)}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Text style={styles.unit}> </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.unit}>оценочная стоимость</Text>
        <TextInput
          style={styles.input}
          value={cost}
          onChangeText={(text) => setCost(text)}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Text style={styles.unit}>грн</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.unit}>тип груза</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={cargoType}
          onChangeText={(text) => setCargoType(text)}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Text style={styles.unit}> </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.unit}>к-во мест</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={placesAmount}
          onChangeText={(text) => setPlacesAmount(text)}
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Text style={styles.unit}> </Text>
      </View>
      <View style={styles.button}>
        <Button
          title="Submit"
          onPress={() => {
            navigation.navigate('Route', {
              weight: parseFloat(weight),
              serviceType,
              cost: parseFloat(cost),
              cargoType,
              placesAmount: parseInt(placesAmount),
            });
          }}

        />
      </View>
      <Text style={styles.message}>Введите вес посылки</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -300,
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
