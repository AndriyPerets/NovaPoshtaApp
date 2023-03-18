import {useEffect, useState} from "react";
import {TextInput, View, StyleSheet, Text, Button, ActivityIndicator, Pressable, ScrollView} from "react-native";
import RouteScreen from "../screens/RouteScreen";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {MainStackParamList} from "../navigation/MainNavigator";
import VerticalSpace from "../components/VerticalSpace";
import {CargoType, listCargoTypes} from "../API/dictionaries";

type Props = BottomTabScreenProps<MainStackParamList, 'Weight'>;

export default function WeightScreen({navigation}: Props) {
  const [weight, setWeight] = useState("0.1");
  const [serviceType, setServiceType] = useState("WarehouseWarehouse");
  const [cost, setCost] = useState("300");
  const [cargoType, setCargoType] = useState<CargoType>();
  const [allCargoTypes, setAllCargoTypes] = useState<CargoType[]>([]);
  const [placesAmount, setPlacesAmount] = useState("1");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    listCargoTypes().then((cargoTypesResponse) => {
      if (cargoTypesResponse.success) {
        setAllCargoTypes(cargoTypesResponse.data)
      } else {
        if (cargoTypesResponse.errors.length > 0) {
          setError(cargoTypesResponse.errors[0])
        }
        if (cargoTypesResponse.warnings.length > 0) {
          setError(cargoTypesResponse.warnings[0])
        }
        if (cargoTypesResponse.info.length > 0) {
          setError(cargoTypesResponse.info[0])
        }
      }
    }).catch((e) => {
      setError(e.message)
    }).finally(() => setLoading(false));
  }, []);

  const handleClearAll = () => {
    setWeight("0.1");
    setServiceType("WarehouseWarehouse");
    setCost("300");
    setCargoType(undefined);
    setPlacesAmount("1")
  };

  return (
    <ScrollView style={styles.container}>
      <VerticalSpace height={200} />
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
        />
        <Text style={styles.unit}>грн</Text>
      </View>
      <View style={styles.inputViewCargo}>
        <Text style={styles.unit}>тип груза</Text>
        {cargoType && <Text>{`Юзер выбрал ${cargoType?.Description}`}</Text>}
        {isLoading ? <ActivityIndicator /> : allCargoTypes.map(cargoTypeListItem => {
          return (<Pressable onPress={() => setCargoType(cargoTypeListItem)} style={styles.cargoItem} key={cargoTypeListItem.Ref}>
            <Text>{cargoTypeListItem.Ref}</Text>
          </Pressable>)
        })}
        {error && <Text>{error}</Text>}
        <Text style={styles.unit}> </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.unit}>к-во мест</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={placesAmount}
          onChangeText={(text) => setPlacesAmount(text)}
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <Text style={styles.unit}> </Text>
      </View>
      <View style={styles.button}>
        <Button
          disabled={!cargoType}
          title="Submit"
          onPress={() => {
            if (cargoType) {
              navigation.navigate('Route', {
                weight: parseFloat(weight),
                serviceType,
                cost: parseFloat(cost),
                cargoType,
                placesAmount: parseInt(placesAmount),
              });
            }
          }}

        />
      </View>
      <Text style={styles.message}>Введите вес посылки</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputViewCargo: {
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 2,
    opacity: 0.9,
  },
  cargoItem: {
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 4,
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
