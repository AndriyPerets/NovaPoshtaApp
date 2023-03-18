import {Dimensions, ImageBackground, StyleSheet} from "react-native";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import React, {createContext, useState} from "react";
import MainStackNavigator from "./navigation/MainNavigator";
import {QueryClient, QueryClientProvider} from "react-query";
import {CargoType} from "./API/dictionaries";


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

interface DimensionsContextProps {
  volume?: number;
  setVolume: (volume?: number) => void;
  cargoType?: CargoType;
  setCargoType: (cargoType?: CargoType) => void;
}

export const DimensionsContext = createContext<DimensionsContextProps>({
  setVolume: () => {},
  volume: undefined,
  cargoType: undefined,
  setCargoType: () => {}
});

const queryClient = new QueryClient()

export default function App() {
  const [volume, setVolume] = useState<number>();
  const [cargoType, setCargoType] = useState<CargoType>();

  return (
    <ImageBackground resizeMode={'contain'} style={styles.background} source={require('./assets/novaPost.png')}>
      <DimensionsContext.Provider value={{volume, setVolume, cargoType, setCargoType}}>
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






