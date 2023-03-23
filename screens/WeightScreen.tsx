import React, {useCallback, useContext} from "react";
import { StyleSheet, ScrollView, Dimensions} from "react-native";
import {MainStackParamList} from "../navigation/MainNavigator";
import VerticalSpace from "../components/VerticalSpace";
import {DimensionsContext} from "../AppContext";
import {Button, TextInput, Text, DefaultTheme} from "react-native-paper";
import {StackScreenProps} from "@react-navigation/stack";
import Row from "../components/Row";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ServiceType} from "../API/dictionaries";

type Props = StackScreenProps<MainStackParamList, 'Weight'>;

export default function WeightScreen({navigation}: Props) {
  const {weight,
      setWeight,
      serviceType,
      setServiceType,
      cost,
      setCost,
      cargoType,
      setCargoType,
      placesAmount,
      setPlacesAmount} = useContext(DimensionsContext);

  const {top} = useSafeAreaInsets();

    const inputTheme = {
        ...DefaultTheme,
        roundness: 60,
    };

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
      <TextInput autoFocus   onChangeText={setWeight} returnKeyType={'done'} keyboardType={'numeric'} value={weight} placeholder={'1'} mode={'outlined'} style={styles.input}
                 label={'Вес'} theme={inputTheme}/>
      <VerticalSpace height={16}/>
      <TextInput  onChangeText={setCost} returnKeyType={'done'} keyboardType={'numeric'} value={cost} placeholder={'300'} mode={'outlined'} style={styles.input}
                 label={'Оценочная стоимость'} theme={inputTheme}/>
      <VerticalSpace height={16}/>
      <TextInput  onChangeText={setPlacesAmount} returnKeyType={'done'} keyboardType={'numeric'}   value={placesAmount} placeholder={'1'} mode={'outlined'} style={styles.input}
                 label={'Количество мест'} theme={inputTheme}/>
      <VerticalSpace height={24}/>
      <Button  mode={'contained'} style={{
          ...styles.buttonContent,
          opacity: !serviceType ? 0.8 : 1,
      }}
      onPress={goToServiceTypeScreen}>
          {serviceType ? `Тип услуги: ${serviceType.Description}` : `Нажмите, чтобы выбрать тип услуги`}</Button>
      <VerticalSpace height={24}/>
      <Button mode={'contained'} style={{
          ...styles.buttonContent,
          opacity: !cargoType ? 0.8 : 1,
      }}
               onPress={goToCargoTypeScreen}>
          {cargoType ? `Тип груза: ${cargoType.Description}` : 'Нажмите, чтобы выбрать тип груза'}</Button>
      <VerticalSpace height={16}/>
      <Row style={styles.buttonsContainer}>
        <Button
            icon={'close'}
            mode={'contained'}
            onPress={handleClearAll}
            style={styles.buttonContent}
        >ClearAll</Button>
        <Button
          disabled={!cargoType}
          mode={'contained'}
          onPress={() => {
              if(cargoType) {
                  navigation.navigate('Route');
              }
              }}
          contentStyle={{
              ...styles.buttonContent,
              opacity: !cargoType ? 0.8 : 1,
          }}
          labelStyle={styles.buttonLabel}
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
      backgroundColor:'#ddd',
      opacity:0.9,
      borderRadius:60,
  },
  buttonsContainer: {
    padding: 16,
    width: Dimensions.get('window').width - 48,
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
      opacity:0.6
  },
    buttonContent: {
        backgroundColor: '#61469E',
        opacity: 0.8,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 18,
    },
});
