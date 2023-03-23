import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {MainStackParamList} from "../navigation/MainNavigator";
import {TextInput, Button, Text, DefaultTheme} from "react-native-paper";
import VerticalSpace from "../components/VerticalSpace";
import Row from "../components/Row";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {DimensionsContext} from "../AppContext";
import {StackScreenProps} from "@react-navigation/stack";

type Props = StackScreenProps<MainStackParamList, 'Volume'>;

const VolumeScreen = ({navigation}: Props) => {
  const [height, setHeight] = useState<string>();
  const [width, setWidth] = useState<string>();
  const [length, setLength] = useState<string>();

  const {volume, setVolume} = useContext(DimensionsContext)

  const {top} = useSafeAreaInsets();

    const inputTheme = {
        ...DefaultTheme,
        roundness: 60,
    };

  // const handleHeightInput = (value: string) => {
  //   setHeight((prevNum) => {
  //     const newValue = value.trim();
  //     // проверка на допустимые символы в числе
  //     const validChars = /^[0-9]*\.?[0-9]*$/;
  //     if (!validChars.test(newValue)) {
  //       return prevNum;
  //     }
  //     return newValue;
  //   });
  // };

  // const handleWidthInput = (value: string) => {
  //   setWidth((prevNum) => {
  //     const newValue = value.trim();
  //     // проверка на допустимые символы в числе
  //     const validChars = /^[0-9]*\.?[0-9]*$/;
  //     if (!validChars.test(newValue)) {
  //       return prevNum;
  //     }
  //     return newValue;
  //   });
  // };

  // const handleLengthInput = (value: string) => {
  //   setLength((prevNum) => {
  //     const newValue = value.trim();
  //     // проверка на допустимые символы в числе
  //     const validChars = /^[0-9]*\.?[0-9]*$/;
  //     if (!validChars.test(newValue)) {
  //       return prevNum;
  //     }
  //     return newValue;
  //   });
  // };

  const handleClearAll = () => {
    setHeight(undefined);
    setWidth(undefined);
    setLength(undefined);
    setVolume(0);
  };

  useEffect(() => {
    if (height !== undefined && width !== undefined && length !== undefined) {
      setVolume(parseFloat(height) * parseFloat(width) * parseFloat(length) * 0.000001);
    }
  }, [height, width, length]);

  return (
    <View style={styles.container}>
      <VerticalSpace height={top + 32} />
      <Text style={styles.title} variant="headlineLarge">Введите размеры коробки</Text>
      <VerticalSpace height={16}/>
      <TextInput autoFocus onChangeText={setHeight} returnKeyType={'done'} keyboardType={'numeric'} value={height} placeholder={'15'} mode={'outlined'} style={styles.input}
                 label={'Высота'} theme={inputTheme}/>
      <VerticalSpace height={16}/>
      <TextInput onChangeText={setWidth} returnKeyType={'done'} keyboardType={'numeric'} value={width} placeholder={'15'} mode={'outlined'} style={styles.input}
                 label={'Ширина'} theme={inputTheme}/>
      <VerticalSpace height={16}/>
      <TextInput onChangeText={setLength} returnKeyType={'done'} keyboardType={'numeric'} value={length} placeholder={'15'} mode={'outlined'} style={styles.input}
                 label={'Длина'} theme={inputTheme}/>
      <VerticalSpace height={16}/>
      <Text style={styles.title} variant="headlineLarge">{volume ? `${volume.toFixed(3)}m3` : 'Введите размеры'}</Text>
      <Row style={styles.buttonsContainer}>
        <Button
          icon={'close'}
          mode={'contained'}
          onPress={handleClearAll}
          style={styles.buttonContent}
        >ClearAll</Button>
          <Button
              disabled={!volume}
              mode={'contained'}
              onPress={() => {
                  if (volume) {
                      navigation.navigate('Weight');
                  }
              }}
              contentStyle={{
                  ...styles.buttonContent,
                  opacity: !volume ? 0.8 : 1,
              }}
              labelStyle={styles.buttonLabel}
          >
              Next
          </Button>
      </Row>
    </View>
  );
}

export default VolumeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
      opacity:0.6
  },
  input: {
    width: '100%',
    backgroundColor: "#ddd",
    opacity:0.9,
  },
  buttonsContainer: {
    padding: 16,
    width: Dimensions.get('window').width - 28,
    justifyContent: 'space-around',
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
