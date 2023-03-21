import {Dimensions, ImageBackground, StyleSheet} from "react-native";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import React, {createContext, useState} from "react";
import MainStackNavigator from "./navigation/MainNavigator";
import {QueryClient, QueryClientProvider} from "react-query";
import {CargoType, ServiceType} from "./API/dictionaries";

//пользовательская тема
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

//тип данных TypeScript для объекта контекста (DimensionsContext)
interface DimensionsContextProps {
  volume?: number;
  setVolume: (volume?: number) => void;
  cargoType?: CargoType;
  setCargoType: (cargoType?: CargoType) => void;
  serviceType?: ServiceType;
  setServiceType: (serviceType?: ServiceType) => void;
  weight?: number;
  setWeight: (weight?: number) => void;
  cost?: number;
  setCost: (cost?: number) => void;
  placesAmount?: number;
  setPlacesAmount?: (placesAmount: number) => void;
}

// экспортируемый объект контекста (DimensionsContext)
export const DimensionsContext = createContext<DimensionsContextProps>({ //экспортируемый объект контекста (DimensionsContext)
  setVolume: () => {},
  volume: undefined,
  setCargoType: () => {},
  cargoType: undefined,
  setServiceType: () => {},
  serviceType: undefined,
  setWeight: () => {},
  weight: undefined,
  setCost: () => {},
  cost: undefined,
  setPlacesAmount: () => {},
  placesAmount: undefined,
});

const queryClient = new QueryClient()

export default function App() {
  const [volume, setVolume] = useState<number>();
  const [cargoType, setCargoType] = useState<CargoType>();
  const [serviceType, setServiceType] = useState<ServiceType>();
  const [weight, setWeight] = useState<number>();
  const [cost, setCost] = useState<number>();
  const [placesAmount, setPlacesAmount] = useState<number>();


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






