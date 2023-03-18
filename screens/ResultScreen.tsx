import {StyleSheet, View, Text, Button} from "react-native";
import React from "react";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {MainStackParamList} from "../navigation/MainNavigator";

type Props = BottomTabScreenProps<MainStackParamList, 'Result'>;

export default function ResultScreen({route, navigation}: Props) {
  const {result} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    fontSize: 20,
    margin: 10,
  },
});
