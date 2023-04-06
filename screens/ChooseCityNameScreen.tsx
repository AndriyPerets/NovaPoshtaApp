import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../navigation/MainNavigator";
import {useCityNames} from "../queries/dictionaries";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DimensionsContext} from "../AppContext";
import React, {useCallback, useContext} from "react";
import VerticalSpace from "../components/VerticalSpace";
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View, Pressable, Text} from "react-native";
import {CityName} from "../API/dictionaries";

type Props = StackScreenProps<MainStackParamList, 'ChooseCityNameScreen'>;


const ChooseCityNameScreen = ({navigation, route}: Props) => {
	const { selectedArea } = route.params;
	const cityNames = useCityNames(selectedArea.Ref);
	const {setCitySenderName, setCityRecipientName} = useContext(DimensionsContext);
	const {top} = useSafeAreaInsets();
	const { type } = route.params;
	console.log("type:", type);


	const renderCityItem: ListRenderItem<CityName> = ({item}) => {
		const onItemPress = () => {
			if(type === 'sender'){
				setCitySenderName(item);
				console.log('sender');
				console.log("CitySenderName: ", item.Description);
			} else if (type === 'recipient'){
				setCityRecipientName(item);
				console.log('recipient');
				console.log("CityRecipientName: ", item.Description);
			}
			navigation.navigate('Route');
		}
		return (
			<Pressable onPress={onItemPress} style={styles.cityItem} key={item.Description}>
				<Text>{item.Description}</Text>
			</Pressable>
		);
	};

	return (
		<>
			<VerticalSpace height={top + 64} />
			{cityNames.isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<FlatList
						data={cityNames.data}
						renderItem={renderCityItem}
						keyExtractor={item => item.Description}
					/>
				</View>
			)}
		</>
	);

}

export default ChooseCityNameScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	cityItem: {
		height: 48,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius:60,
		marginBottom: 8,
		backgroundColor: "#ddd",
		opacity:0.8,
	},
});
