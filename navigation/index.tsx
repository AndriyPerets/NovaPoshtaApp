import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome} from "@expo/vector-icons";
import MainScreen from "../screens/MainScreen";
import VolumeScreen from "../screens/VolumeScreen";
import WeightScreen from "../screens/WeightScreen";
import RouteScreen from "../screens/RouteScreen";
import ResultScreen from "../screens/ResultScreen";


export default function Navigation(){
    return(
        <NavigationContainer>
            <BottomTabNavigator/>
        </NavigationContainer>
    )
}

// const Stack = createStackNavigator();
//
//
// function RootNavigator(){
//     return(
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="MainScreen"
//                 component={BottomTabNavigator}
//                 options={{ headerShown: false}}
//             />
//         </Stack.Navigator>
//     )
// }


const BottomTab = createBottomTabNavigator();

function BottomTabNavigator(){
    return(
        <BottomTab.Navigator initialRouteName="Main">
            <BottomTab.Screen
                name="Main"
                component={MainScreen}
                options={{
                    tabBarIcon:({color, size})=>
                        <FontAwesome
                            name="home"
                            size={size}
                            color={color}
                        />
                }}
            />
            <BottomTab.Screen
                name="Volume"
                component={VolumeScreen}
                options={{
                    tabBarIcon:({color, size})=>
                        <FontAwesome
                            name="home"
                            size={size}
                            color={color}
                        />
                }}
            />
            <BottomTab.Screen
                name="Weight"
                component={WeightScreen}
                options={{
                    tabBarIcon:({color, size})=>
                        <FontAwesome
                            name="home"
                            size={size}
                            color={color}
                        />
                }}
            />
            <BottomTab.Screen
                name="Route"
                component={RouteScreen}
                options={{
                    tabBarIcon:({color, size})=>
                        <FontAwesome
                            name="home"
                            size={size}
                            color={color}
                        />
                }}
            />
            {/*<BottomTab.Screen*/}
            {/*    name="Result"*/}
            {/*    component={ResultScreen}*/}
            {/*    options={{*/}
            {/*        tabBarIcon:({color, size})=>*/}
            {/*            <FontAwesome*/}
            {/*                name="home"*/}
            {/*                size={size}*/}
            {/*                color={color}*/}
            {/*            />*/}
            {/*    }}*/}
            {/*/>*/}
        </BottomTab.Navigator>
    )
}