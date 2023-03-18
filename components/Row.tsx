import React from "react";
import {Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

const Row = ({style, ...restParams}: Props) => {
  return <Pressable {...restParams} style={[styles.row, style]}  />;
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  }
});
