import {Button, StyleSheet, View} from "react-native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../navigation/MainNavigator";

type Props = BottomTabScreenProps<BottomTabParamList, 'Main'>;

export default function MainScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Let's order a parcel delivery"
          onPress={() => navigation.navigate("Volume")}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 50,
    width: 350,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    opacity: 0.9,
  },
});
// button: {
//     marginTop:600,
//     justifyContent:"center",
//     alignItems:"center",
//     marginTop:-100,
//     width:350,
//     backgroundColor: '#ddd',
//     color: '#FFFFFF',
//     padding: 5,
//     borderRadius: 10,
//     margin: 5,
//     borderWidth: 1,
//     opacity: 0.9,
// },
