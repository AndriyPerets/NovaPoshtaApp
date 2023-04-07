import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../navigation/MainNavigator";
import {useCityNames} from "../queries/dictionaries";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DimensionsContext} from "../AppContext";
import React, {useContext, useState} from "react";
import VerticalSpace from "../components/VerticalSpace";
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View, Pressable} from "react-native";
import {CityName} from "../API/dictionaries";
import {TextInput, Text, DefaultTheme} from "react-native-paper";


type Props = StackScreenProps<MainStackParamList, 'ChooseCityNameScreen'>;


const ChooseCityNameScreen = ({navigation, route}: Props) => {
	const cityNames = useCityNames();
	const {setCitySenderName,
		setCityRecipientName,
		setCitySenderRef,
		setCityRecipientRef} = useContext(DimensionsContext);
	const {top} = useSafeAreaInsets();
	const { type } = route.params;
	const [filter, setFilter] = useState('');

	const inputTheme = {
		...DefaultTheme,
		roundness: 60,
	};

	const handleFilterChange = (text: string) => {
		setFilter(text);
	};

	const renderCityItem: ListRenderItem<CityName> = ({item}) => {
		const onItemPress = () => {
			if(type === 'sender'){
				setCitySenderName(item);
				setCitySenderRef(item.Ref);
			} else if (type === 'recipient'){
				setCityRecipientName(item);
				setCityRecipientRef(item.Ref);
			}
			navigation.navigate('Route');
		}
		return (
			<Pressable onPress={onItemPress} style={styles.cityItem} key={item.Ref}>
				<Text>{item.DescriptionRu}</Text>
			</Pressable>
		);
	};

	const filteredData = filter
		? cityNames.data?.filter((city) =>
			city.DescriptionRu.toLowerCase().includes(filter.toLowerCase())
		)
		: cityNames.data?.slice(0, 10);

	return (
		<>
			<VerticalSpace height={top + 64} />
			{cityNames.isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
						<View style={styles.filterContainer}>
							<TextInput
								autoFocus
								style={styles.filterInput}
								onChangeText={handleFilterChange}
								value={filter}
								placeholder="Введите название города"
								label={'Введите название города'}
								theme={inputTheme}
								mode={'outlined'}
								returnKeyType="done"
							/>
						</View>
					<FlatList
						data={filteredData}
						renderItem={renderCityItem}
						keyExtractor={item => item.Ref}
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
	filterContainer: {
		marginBottom: 8,
	},
	filterInput: {
		width: '100%',
		backgroundColor: '#ddd',
		opacity: 0.9,
	},
});
