import {StyleSheet, ScrollView, Dimensions} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {MainStackParamList} from "../navigation/MainNavigator";
import {DimensionsContext} from "../AppContext";
import {StackScreenProps} from "@react-navigation/stack";
import VerticalSpace from "../components/VerticalSpace";
import {Button, Text, DefaultTheme} from "react-native-paper";
import Row from "../components/Row";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useCityRef, useRouteRequest} from "../queries/dictionaries";
import {RouteProps, routeRequest} from "../API/dictionaries";
import {useQuery} from "react-query";


type Props = StackScreenProps<MainStackParamList, 'Route'>;

export default function RouteScreen({navigation}: Props) {
  const {
      citySenderRef,
      setCitySenderRef,
      cityRecipientRef,
      setCityRecipientRef,
      citySenderName,
      setCitySenderName,
      cityRecipientName,
      setCityRecipientName,
      result,
      setResult,
      volume,
      weight,
      cost,
      placesAmount,
      cargoType,
      serviceType
      } = useContext(DimensionsContext);

  const inputTheme = {
    ...DefaultTheme,
    roundness: 60,
  };

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (citySenderRef && cityRecipientRef) {
      console.log({citySenderName});
      console.log({cityRecipientName});
    }
  }, [citySenderRef, cityRecipientRef]);

  const routeProps: RouteProps = {
    senderRef: citySenderRef?.Ref ?? "",
    recipientRef: cityRecipientRef?.Ref ?? "",
    weight: weight ?? "",
    serviceType: serviceType ? serviceType.toString() : "",
    cost: cost ?? "",
    cargoType: cargoType ? cargoType.toString() : "",
    placesAmount: placesAmount ?? "",
    volume: volume ? volume.toString() : "",
  };

  const handleSubmit = () => {
    if (citySenderName && cityRecipientName) {
      const senderRefQuery = useCityRef(citySenderName);
      const recipientRefQuery = useCityRef(cityRecipientName);

      if (senderRefQuery.isSuccess && recipientRefQuery.isSuccess) {
        setCitySenderRef(senderRefQuery.data);
        setCityRecipientRef(recipientRefQuery.data);
      }
    }
  };

  const getRouteResult = async () => {
    return useRouteRequest(routeProps);
  };

  const { data: routeResult } = useQuery(
    ["routeRequest", routeProps],
    getRouteResult,
    { enabled: !!citySenderRef && !!cityRecipientRef }
  );

  const goToAreaNameScreen = useCallback(
    (type: 'sender' | 'recipient') => navigation.navigate('ChooseAreaNameScreen', {type}),
    []);

    const handleClearAll = () => {
        setCitySenderName();
        setCityRecipientName();
        setResult();
    };

  return (
      <ScrollView style={styles.container}>
        <VerticalSpace height={top + 32} />
        <Text style={styles.title} variant="headlineLarge">Введите путь</Text>
        <VerticalSpace height={16}/>
        <Button
          mode="contained"
          style={{
            ...styles.buttonContent,
            opacity: !citySenderName ? 0.8 : 1,
          }}
          onPress={() => goToAreaNameScreen("sender")}
        >
          {citySenderName
            ? `Город отправки: ${citySenderName.Description}`
            : `Нажмите, чтобы выбрать название города`}
        </Button>
        <VerticalSpace height={16} />
        <Button
          mode="contained"
          style={{
            ...styles.buttonContent,
            opacity: !cargoType ? 0.8 : 1,
          }}
          onPress={() => goToAreaNameScreen("recipient")}
        >
          {cityRecipientName
            ? `Город доставки: ${cityRecipientName.Description}`
            : `Нажмите, чтобы выбрать название города`}
        </Button>

        <VerticalSpace height={16}/>
          <Text style={styles.title} variant="headlineLarge">{result ? `${result}` : 'Выберете город'}</Text>
        <Row style={styles.buttonsContainer}>
          <Button
              icon={'close'}
              mode={'contained'}
              onPress={handleClearAll}
              style={styles.buttonContent}
          >ClearAll</Button>
          <Button
            disabled={!cityRecipientName}
            mode={'contained'}
            onPress={()=>{
              if(cityRecipientName){
                navigation.navigate('Result');
                handleSubmit();
              }
            }}
            contentStyle={{
              ...styles.buttonContent,
              opacity: !cityRecipientName ? 0.8 : 1,
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
