import React from "react";
import {StyleSheet, View} from "react-native";

interface Props {
  height: number;
}

const VerticalSpace = ({height}: Props) => {
  return <View style={{height}} />;
};

export default VerticalSpace;
