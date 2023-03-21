import VolumeScreen from "../screens/VolumeScreen";
import WeightScreen from "../screens/WeightScreen";
import RouteScreen from "../screens/RouteScreen";
import {createStackNavigator} from "@react-navigation/stack";
import ResultScreen from "../screens/ResultScreen";
import ChooseCargoTypeScreen from "../screens/ChooseCargoTypeScreen";
import ChooseServiceTypeScreen from "../screens/ChooseServiceTypeScreen";


export type MainStackParamList = {
  Main: undefined;
  ChooseCargoTypeScreen: undefined;
  ChooseServiceTypeScreen: undefined;
  Volume: undefined;
  Weight: undefined;
  Route: undefined
    // weight: number;
    // serviceType: string;
    // cost: number;
    // placesAmount: number;

  Result: {
    result: string;
  };
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
    </MainStack.Navigator>
  )
}

export default MainStackNavigator;
