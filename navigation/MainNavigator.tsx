import VolumeScreen from "../screens/VolumeScreen";
import WeightScreen from "../screens/WeightScreen";
import RouteScreen from "../screens/RouteScreen";
import {createStackNavigator} from "@react-navigation/stack";
import ResultScreen from "../screens/ResultScreen";
import {CargoType} from "../API/dictionaries";

export type MainStackParamList = {
  Main: undefined;
  Volume: undefined;
  Weight: undefined;
  Route: {
    weight: number;
    serviceType: string;
    cost: number;
    cargoType: CargoType;
    placesAmount: number;
  };
  Result: {
    result: string;
  };
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Main">
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
        component={RouteScreen}
      />
      <MainStack.Screen
          name="Result"
          component={ResultScreen}
      />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator;
