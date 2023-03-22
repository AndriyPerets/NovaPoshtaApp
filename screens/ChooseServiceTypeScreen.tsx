import {StyleSheet, Text, ActivityIndicator, Pressable, FlatList, ListRenderItem, View} from "react-native";
import React, {useCallback, useContext} from "react";
import {MainStackParamList} from "../navigation/MainNavigator";
import {useServiceTypes} from "../queries/dictionaries";
import {DimensionsContext} from "../AppContext";
import { ServiceType} from "../API/dictionaries";
import {StackScreenProps} from "@react-navigation/stack";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import VerticalSpace from "../components/VerticalSpace";

type Props = StackScreenProps<MainStackParamList, 'ChooseServiceTypeScreen'>;

const ChooseServiceTypeScreen = ({navigation}: Props) => {
    const serviceTypes = useServiceTypes()
    const {setServiceType} = useContext(DimensionsContext)
    const {top} = useSafeAreaInsets();

    const renderServiceItem: ListRenderItem<ServiceType> = useCallback(({item}) => {
        const onItemPress = () => {
            setServiceType(item)
            navigation.navigate('Weight')
        }
        return <Pressable onPress={onItemPress} style={styles.cargoItem} key={item.Ref}>
            <Text>{item.Ref}</Text>
        </Pressable>
    }, [])

    return (
        <>
            <VerticalSpace height={top +64}/>
            {serviceTypes.isLoading ? (<ActivityIndicator/>) :
                (         <View style={styles.container}>
                <FlatList
                        data={serviceTypes.data}
                        renderItem={renderServiceItem}
                        keyExtractor={item => item.Ref}/>
                    </View>
                )}
        </>
    );
}

export default ChooseServiceTypeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    cargoItem: {
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
