import {Dimensions, ImageBackground, StyleSheet} from "react-native";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import React, {createContext, useState} from "react";
import MainStackNavigator from "./navigation/MainNavigator";


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
}

export const DimensionsContext = createContext<DimensionsContextProps>({
  setVolume: () => {
  },
  volume: undefined
});

export default function App() {
  const [volume, setVolume] = useState<number>();

  return (
    <ImageBackground resizeMode={'contain'} style={styles.background} source={require('./assets/novaPost.png')}>
      <DimensionsContext.Provider value={{volume, setVolume}}>
        <NavigationContainer theme={navTheme}>
          <MainStackNavigator/>
        </NavigationContainer>
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






