import {NavigationContainer} from "@react-navigation/native";
import VolumeScreen from "../screens/VolumeScreen";
import WeightScreen from "../screens/WeightScreen";
import RouteScreen from "../screens/RouteScreen";
import {createStackNavigator} from "@react-navigation/stack";
import ResultScreen from "../screens/ResultScreen";


export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStackNavigator/>
    </NavigationContainer>
  )
}

export type MainStackParamList = {
  Main: undefined;
  Volume: undefined;
  Weight: {
    volume?: number;
  };
  Route: {
    volume?: number;
    weight: number;
    serviceType: string;
    cost: number;
    cargoType: string;
    placesAmount: number;
  };
  Result: {
    result: string;
  };
};

const MainStack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Main">
      <MainStack.Screen
        name="Volume"
        options={{headerShown: false}}
        component={VolumeScreen}
      />
      <MainStack.Screen
        name="Weight"
        component={WeightScreen}
      />
      <MainStack.Screen
        name="Route"
        component={RouteScreen}
      />
      <MainStack.Screen
          name="Result"
          component={ResultScreen}
      />
    </MainStack.Navigator>
  )
}
