import {StyleSheet, ScrollView, Dimensions, Alert} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {MainStackParamList} from "../navigation/MainNavigator";
import {DimensionsContext} from "../AppContext";
import {StackScreenProps} from "@react-navigation/stack";
import VerticalSpace from "../components/VerticalSpace";
import {Button, TextInput, Text, DefaultTheme} from "react-native-paper";
import Row from "../components/Row";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {getCityRefByName, routeRequest} from "../API/dictionaries";
import {useCityRef, useRouteRequest} from "../queries/dictionaries";
import {RouteProps} from "../API/dictionaries";
import {novaPoshtaRequest} from "../API/API";

type Props = StackScreenProps<MainStackParamList, 'Route'>;

export default function RouteScreen({route, navigation}: Props) {
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

    const routeProps:RouteProps = {
        CitySender: citySenderRef,
        CityRecipient: cityRecipientRef,
        Weight: weight,
        ServiceType: serviceType,
        Cost: cost,
        CargoType: cargoType,
        SeatsAmount: placesAmount,
        VolumeGeneral: volume,
    }

    const handleSubmit = async () => {
        if (citySenderName && cityRecipientName) {
            setCitySenderRef(useCityRef(citySenderName));
            setCityRecipientRef(useCityRef(cityRecipientName));
        }
    };

    useEffect (()=> {
        if(citySenderRef && cityRecipientRef) {
            setResult(useRouteRequest(routeProps));
        }
    }, [citySenderRef, cityRecipientRef]);

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
        <TextInput autoFocus   onChangeText={()=>setCitySenderName} returnKeyType={'done'} keyboardType={'numeric'} value={citySenderName} placeholder={'Киев'} mode={'outlined'} style={styles.input}
                   label={'Откуда'} theme={inputTheme}/>
        <VerticalSpace height={16}/>
        <TextInput  onChangeText={()=>setCityRecipientName} returnKeyType={'done'} keyboardType={'numeric'} value={cityRecipientName} placeholder={'Львов'} mode={'outlined'} style={styles.input}
                    label={'Куда'} theme={inputTheme}/>
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
                onPress={handleSubmit}
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
