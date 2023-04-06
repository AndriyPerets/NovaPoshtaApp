import VolumeScreen from "../screens/VolumeScreen";
import WeightScreen from "../screens/WeightScreen";
import RouteScreen from "../screens/RouteScreen";
import {createStackNavigator} from "@react-navigation/stack";
import ResultScreen from "../screens/ResultScreen";
import ChooseCargoTypeScreen from "../screens/ChooseCargoTypeScreen";
import ChooseServiceTypeScreen from "../screens/ChooseServiceTypeScreen";
import ChooseAreaNameScreen from "../screens/ChooseAreaNameScreen";
import ChooseCityNameScreen from "../screens/ChooseCityNameScreen";
import {AreaName} from "../API/dictionaries";


export type MainStackParamList = {
  ChooseCargoTypeScreen: undefined;
  ChooseServiceTypeScreen: undefined;
  ChooseAreaNameScreen: {type?: 'sender' | 'recipient';};
  ChooseCityNameScreen: { selectedArea: AreaName; type?: "sender" | "recipient" };
  Volume: undefined;
  Weight: undefined;
  Route: undefined;
  Result: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Volume">
      <MainStack.Screen
        name="Volume"
        options={{headerShown: false}}
        component={VolumeScreen}
      />
      <MainStack.Screen
        name="Weight"
        options={{headerTransparent: true}}
        component={WeightScreen}
      />
      <MainStack.Screen
        name="Route"
        options={{headerTransparent: true}}
        component={RouteScreen}
      />
      <MainStack.Screen
          name="Result"
          options={{headerTransparent: true}}
          component={ResultScreen}
      />
      <MainStack.Screen
          name="ChooseCargoTypeScreen"
          options={{headerTransparent: true}}
          component={ChooseCargoTypeScreen}
      />
      <MainStack.Screen
          name="ChooseServiceTypeScreen"
          options={{headerTransparent: true}}
          component={ChooseServiceTypeScreen}
      />
      <MainStack.Screen
        name="ChooseAreaNameScreen"
        options={{headerTransparent: true}}
        component={ChooseAreaNameScreen}
      />
      <MainStack.Screen
        name="ChooseCityNameScreen"
        options={{headerTransparent: true}}
        component={ChooseCityNameScreen}
      />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator;
