import {Dimensions, ImageBackground, StyleSheet} from "react-native";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import MainStackNavigator from "./navigation/MainNavigator";
import {QueryClient, QueryClientProvider} from "react-query";
import {CargoType, ServiceType} from "./API/dictionaries";
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


  return (
    <ImageBackground resizeMode={'contain'} style={styles.background} source={require('./assets/novaPost.png')}>
      <DimensionsContext.Provider value={{volume, setVolume, cargoType, setCargoType, serviceType, setServiceType, weight, setWeight, cost, setCost, placesAmount, setPlacesAmount}}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={navTheme}>
            <MainStackNavigator/>
          </NavigationContainer>
        </QueryClientProvider>
      </DimensionsContext.Provider>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});






