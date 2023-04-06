import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../navigation/MainNavigator";
import {useAreaNames} from "../queries/dictionaries";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DimensionsContext} from "../AppContext";
import React, {useCallback, useContext} from "react";
import VerticalSpace from "../components/VerticalSpace";
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View, Pressable, Text} from "react-native";
import {AreaName} from "../API/dictionaries";

type Props = StackScreenProps<MainStackParamList, 'ChooseAreaNameScreen'>;


const ChooseAreaNameScreen = ({navigation, route}: Props) => {
	const areaNames = useAreaNames();
	const {setAreaSenderName, setAreaRecipientName} = useContext(DimensionsContext);
	const {top} = useSafeAreaInsets();
	const { type } = route.params;


	const renderAreaItem: ListRenderItem<AreaName> = useCallback(({item}) => {
		const onItemPress = () => {
			if(type === 'sender'){
			setAreaSenderName(item);
			} else if (type === 'recipient'){
			setAreaRecipientName(item);
			}
			navigation.navigate("ChooseCityNameScreen", { selectedArea: item, type });
		}
		return <Pressable onPress={onItemPress} style={styles.areaItem} key={item.Description}>
			<Text>{item.Description}</Text>
		</Pressable>
	}, [])

	return (
		<>
			<VerticalSpace height={top + 64} />
			{areaNames.isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<FlatList
						data={areaNames.data}
						renderItem={renderAreaItem}
						keyExtractor={item => item.Description}
					/>
				</View>
			)}
		</>
	);

}

export default ChooseAreaNameScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	areaItem: {
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
