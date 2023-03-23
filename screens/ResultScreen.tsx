import {StyleSheet, View, Text, Button} from "react-native";
import React, {useContext} from "react";
import {MainStackParamList} from "../navigation/MainNavigator";
import {StackScreenProps} from "@react-navigation/stack";
import {DimensionsContext} from "../AppContext";

type Props = StackScreenProps<MainStackParamList, 'Result'>;

export default function ResultScreen({route, navigation}: Props) {
  const {result} = useContext(DimensionsContext);

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
