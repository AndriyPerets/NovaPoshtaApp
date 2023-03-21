import React, {useCallback, useContext} from "react";
import { StyleSheet, ScrollView, Dimensions} from "react-native";
import {MainStackParamList} from "../navigation/MainNavigator";
import VerticalSpace from "../components/VerticalSpace";
import {DimensionsContext} from "../App";
import {Button, TextInput, Text} from "react-native-paper";
import {StackScreenProps} from "@react-navigation/stack";
import Row from "../components/Row";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type Props = StackScreenProps<MainStackParamList, 'Weight'>;

export default function WeightScreen({navigation}: Props) {
  const {weight, setWeight, serviceType, setServiceType, cost, setCost, cargoType, setCargoType, placesAmount, setPlacesAmount} = useContext(DimensionsContext);

  const {top} = useSafeAreaInsets();


  // const cargoTypes = useQuery<CargoType[], any, CargoType[]>('cargoTypes', async () => {
  //   const cargoTypesResponse = await listCargoTypes();
  //   if (cargoTypesResponse.success) {
  //     return cargoTypesResponse.data
  //   } else {
  //     if (cargoTypesResponse.errors.length > 0) {
  //       throw new Error(cargoTypesResponse.errors[0])
  //     }
  //     if (cargoTypesResponse.warnings.length > 0) {
  //       throw new Error(cargoTypesResponse.errors[0])
  //     }
  //     if (cargoTypesResponse.info.length > 0) {
  //       throw new Error(cargoTypesResponse.errors[0])
  //     }
  //     throw new Error('Unexpected error')
  //   }
  // })

  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState<string>('');

  // useEffect(() => {
  //   listCargoTypes().then((cargoTypesResponse) => {
  //     if (cargoTypesResponse.success) {
  //       setAllCargoTypes(cargoTypesResponse.data)
  //     } else {
  //       if (cargoTypesResponse.errors.length > 0) {
  //         setError(cargoTypesResponse.errors[0])
  //       }
  //       if (cargoTypesResponse.warnings.length > 0) {
  //         setError(cargoTypesResponse.warnings[0])
  //       }
  //       if (cargoTypesResponse.info.len12gth > 0) {
  //         setError(cargoTypesResponse.info[0])
  //       }
  //     }
  //   }).catch((e) => {
  //     setError(e.message)
  //   }).finally(() => setLoading(false));
  // }, []);

  const handleClearAll = () => {
    setWeight(undefined);
    setServiceType(undefined);
    setCost(undefined);
    setCargoType(undefined);
    setPlacesAmount(undefined)
  };

  const goToCargoTypeScreen = useCallback(
    () => navigation.navigate('ChooseCargoTypeScreen'),
    []);

  const goToServiceTypeScreen = useCallback(
      () => navigation.navigate('ChooseServiceTypeScreen'),
      []);

  return (
    <ScrollView style={styles.container}>
      <VerticalSpace height={top + 32} />
      <Text style={styles.title} variant="headlineLarge">Заполните поля</Text>
      <VerticalSpace height={16}/>
      <TextInput autoFocus   onChangeText={(text) => {
          const weight = parseFloat(text);
          if (!isNaN(weight)) {
              setWeight(weight);
          }
      }} returnKeyType={'done'} keyboardType={'numeric'} value={weight?.toString()} placeholder={'1'} mode={'outlined'} style={styles.input}
                 label={'Вес'}/>
      <VerticalSpace height={16}/>
      <TextInput  onChangeText={(text)=>{
          const cost = parseFloat(text);
          if (isNaN(cost)){
              setCost(cost)
          }
      }} returnKeyType={'done'} keyboardType={'numeric'} value={cost?.toString()} placeholder={'300'} mode={'outlined'} style={styles.input}
                 label={'Оценочная стоимость'}/>
      <VerticalSpace height={16}/>
      <TextInput  onChangeText={(text)=>{
          const placesAmount = parseFloat(text);
          if (isNaN(placesAmount)){
              setPlacesAmount(placesAmount)
          }
      }} returnKeyType={'done'} keyboardType={'numeric'}   value={placesAmount?.toString()} placeholder={'1'} mode={'outlined'} style={styles.input}
                 label={'Количество мест'}/>
      <VerticalSpace height={16}/>
      <Button mode={'contained'}
      onPress={goToServiceTypeScreen}>{serviceType ? `Тип услуги: ${serviceType.Description}` : `Нажмите, чтобы выбрать тип услуги`}</Button>
      <VerticalSpace height={16}/>
      <Button mode={'contained'}
               onPress={goToCargoTypeScreen}>{cargoType ? `Тип груза: ${cargoType.Description}` : 'Нажмите, чтобы выбрать тип груза'}</Button>
      <VerticalSpace height={16}/>
      <Row style={styles.buttonsContainer}>
        <Button
            icon={'close'}
            mode={'contained'}
            onPress={handleClearAll}
        >ClearAll</Button>
        <Button
          disabled={!cargoType}
          mode={'contained'}
          onPress={() => {
              if(cargoType) {
                  navigation.navigate('Route');
              }
              }}
              // weight: parseFloat(weight),
              // serviceType,
              // cost: parseFloat(cost),
              // placesAmount: parseInt(placesAmount),
            // });

        >Next</Button>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
  },
  buttonsContainer: {
    padding: 16,
    width: Dimensions.get('window').width - 48,
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
  },
});
