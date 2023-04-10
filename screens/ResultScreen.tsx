import {Dimensions, StyleSheet, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {MainStackParamList} from "../navigation/MainNavigator";
import {StackScreenProps} from "@react-navigation/stack";
import {DimensionsContext} from "../AppContext";
import VerticalSpace from "../components/VerticalSpace";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Button, Text} from "react-native-paper";
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {Google_API_URL, Google_API_KEY} from "../constants";
import polyline from '@mapbox/polyline';


type Props = StackScreenProps<MainStackParamList, 'Result'>;

export default function ResultScreen({route, navigation}: Props) {
	const {
		result,
		citySenderName,
		cityRecipientName
	} = useContext(DimensionsContext);
	const {top} = useSafeAreaInsets();

	const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
	const [coordinatesFetched, setCoordinatesFetched] = useState(false);
	const [showRoute, setShowRoute] = useState(false);

	const senderLatitude = citySenderName?.Latitude ? Number(citySenderName.Latitude) : undefined;
	const senderLongitude = citySenderName?.Longitude ? Number(citySenderName.Longitude) : undefined;
	const recipientLatitude = cityRecipientName?.Latitude ? Number(cityRecipientName.Latitude) : undefined;
	const recipientLongitude = cityRecipientName?.Longitude ? Number(cityRecipientName.Longitude) : undefined;

	const kievLatitude = 50.4501;
	const kievLongitude = 30.5234;
	const kievLatitudeDelta = 0.0922;
	const kievLongitudeDelta = 0.0421;

	const [region, setRegion] = useState({
		latitude: (senderLatitude && recipientLatitude) ? (senderLatitude + recipientLatitude) / 2 : kievLatitude,
		longitude: (senderLongitude && recipientLongitude) ? (senderLongitude + recipientLongitude) / 2 : kievLongitude,
		latitudeDelta: (senderLatitude && recipientLatitude) ? Math.abs(senderLatitude - recipientLatitude) * 2 : kievLatitudeDelta,
		longitudeDelta: (senderLongitude && recipientLongitude) ? Math.abs(senderLongitude - recipientLongitude) * 2 : kievLongitudeDelta,
	});


	// console.log("Sender Latitude:", typeof (citySenderName?.Latitude), citySenderName?.Latitude);
	// console.log("Sender Longitude:", typeof (citySenderName?.Longitude), citySenderName?.Longitude);
	// console.log("Recipient Latitude:", typeof (cityRecipientName?.Latitude), cityRecipientName?.Latitude);
	// console.log("Recipient Longitude:", typeof (cityRecipientName?.Longitude), cityRecipientName?.Longitude);

	// const isValidCoordinate = (coordinate: number | undefined) => {
	// 	if (typeof coordinate === "number" && !isNaN(coordinate)) {
	// 		const roundedCoordinate = parseFloat(coordinate.toFixed(6));
	// 		return roundedCoordinate >= -180 && roundedCoordinate <= 180;
	// 	}
	// 	return false;
	// };
	//
	// const isValidLatitude = (latitude: string | undefined) => {
	// 	if (latitude) {
	// 		const parsedLatitude = parseFloat(latitude);
	// 		return isValidCoordinate(parsedLatitude) && parsedLatitude >= -90 && parsedLatitude <= 90;
	// 	}
	// 	return false;
	// };
	//
	// const isValidLongitude = (longitude: string | undefined) => {
	// 	if (longitude) {
	// 		const parsedLongitude = parseFloat(longitude);
	// 		return isValidCoordinate(parsedLongitude) && parsedLongitude >= -180 && parsedLongitude <= 180;
	// 	}
	// 	return false;
	// };

	const fetchRouteCoordinates = async () => {
		try {
			const response = await fetch(
				`${Google_API_URL}origin=${senderLatitude},${senderLongitude}&destination=${recipientLatitude},${recipientLongitude}&key=${Google_API_KEY}`
			);
			const data = await response.json();
			console.log('Google Maps API response:', data);

			if (data.routes && data.routes[0] && data.routes[0].overview_polyline && data.routes[0].overview_polyline.points) {
				const coordinates = polyline.decode(data.routes[0].overview_polyline.points).map((coord: [number, number]) => {
					return {
						latitude: coord[0],
						longitude: coord[1],
					};
				});
				// console.log("Decoded coordinates:", coordinates);
				// setRouteCoordinates(coordinates);
				setCoordinatesFetched(true);
				console.log('Route coordinates fetched');
					} else {
						console.error('No route data available');
					}
			} catch (error) {
				console.error('Error fetching route coordinates:', error);
			}
	};

	const handleShowRoute = async () => {
		try {
			// console.log("handleShowRoute called");
			// console.log("isValidLatitude(citySenderName?.Latitude):", isValidLatitude(citySenderName?.Latitude));
			// console.log("isValidLongitude(citySenderName?.Longitude):", isValidLongitude(citySenderName?.Longitude));
			// console.log("isValidLatitude(cityRecipientName?.Latitude):", isValidLatitude(cityRecipientName?.Latitude));
			// console.log("isValidLongitude(cityRecipientName?.Longitude):", isValidLongitude(cityRecipientName?.Longitude));
			if (!coordinatesFetched) {
				console.log("fetchRouteCoordinates will be called");
				await fetchRouteCoordinates();
			}
			setShowRoute(true);
			setRegion({
				latitude: ((senderLatitude ?? 0) + (recipientLatitude ?? 0)) / 2,
				longitude: ((senderLongitude ?? 0) + (recipientLongitude ?? 0)) / 2,
				latitudeDelta: Math.abs((senderLatitude ?? 0) - (recipientLatitude ?? 0)) * 2,
				longitudeDelta: Math.abs((senderLongitude ?? 0) - (recipientLongitude ?? 0)) * 2,
			});
		}catch (error) {
			console.error("Error in handleShowRoute:", error);
			alert("Ошибка при отображении маршрута. Пожалуйста, попробуйте еще раз.");
		}
	};
	//
	// useEffect(() => {
	// 	console.log("routeCoordinates changed:", routeCoordinates);
	// }, [routeCoordinates]);

	return (
		<View style={styles.container}>
			<VerticalSpace height={top + 144}/>
			<View style={styles.resultContainer}>
				<Text style={styles.result}>{result} uah</Text>
			</View>
			<VerticalSpace height={16}/>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
			>
				{showRoute && (
					<Polyline
						coordinates={routeCoordinates}
						strokeWidth={5}
						strokeColor="blue"
						geodesic={true}
					/>
				)}
			</MapView>
			<VerticalSpace height={16}/>
			<Button mode="contained" onPress={handleShowRoute}>
				Show Route
			</Button>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	resultContainer: {
		height: 50,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 25,
		width: '100%',
		backgroundColor: '#ddd',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
		// overflow: 'hidden',
		opacity: 0.8,
	},
	result: {
		textAlign: 'center',
		fontSize: 40,
		fontStyle: 'italic',
	},
	map: {
		width: Dimensions.get('window').width - 32,
		height: 300,
		borderRadius: 10,
		overflow: 'hidden',
		marginTop: 16,
	},
});
