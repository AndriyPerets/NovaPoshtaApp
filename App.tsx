import {Dimensions, ImageBackground, StyleSheet, View} from "react-native";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import MainStackNavigator from "./navigation/MainNavigator";
import {QueryClient, QueryClientProvider} from "react-query";
import {CargoType, CityName, RouteProps, ServiceType} from "./API/dictionaries";
import { DimensionsContext } from "./AppContext";

//пользовательская тема
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};



const queryClient = new QueryClient()

export default function App() {
  const [volume, setVolume] = useState<number>();
  const [cargoType, setCargoType] = useState<CargoType>();
  const [serviceType, setServiceType] = useState<ServiceType>();
  const [weight, setWeight] = useState<string>();
  const [cost, setCost] = useState<string>();
  const [placesAmount, setPlacesAmount] = useState<string>();
  const [citySenderName, setCitySenderName] = useState<CityName>();
  const [cityRecipientName, setCityRecipientName] = useState<CityName>();
  const [citySenderRef, setCitySenderRef] = useState<RouteProps>();
  const [cityRecipientRef, setCityRecipientRef] = useState<RouteProps>();
  const [result, setResult] = useState<string>()



  return (
      <View style={styles.container}>
        <ImageBackground
            resizeMode={'contain'}
            style={styles.background}
            source={require('./assets/novaPost.png')}
        />
        <DimensionsContext.Provider
            value={{
              volume,
              setVolume,
              cargoType,
              setCargoType,
              serviceType,
              setServiceType,
              weight,
              setWeight,
              cost,
              setCost,
              placesAmount,
              setPlacesAmount,
              citySenderName,
              setCitySenderName,
              cityRecipientName,
              setCityRecipientName,
              citySenderRef,
              setCitySenderRef,
              cityRecipientRef,
              setCityRecipientRef,
              result,
              setResult,
            }}
        >
          <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={navTheme}>
              <MainStackNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </DimensionsContext.Provider>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    position: 'absolute', // position the image behind the content
  },
});










