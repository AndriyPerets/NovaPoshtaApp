import {StyleSheet, Text, ActivityIndicator, Pressable, FlatList, ListRenderItem, View} from "react-native";
import React, {useCallback, useContext} from "react";
import {MainStackParamList} from "../navigation/MainNavigator";
import {useCargoTypes} from "../queries/dictionaries";
import {DimensionsContext} from "../AppContext";
import {CargoType} from "../API/dictionaries";
import {StackScreenProps} from "@react-navigation/stack";
import VerticalSpace from "../components/VerticalSpace";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type Props = StackScreenProps<MainStackParamList, 'ChooseCargoTypeScreen'>;

const ChooseCargoTypeScreen = ({navigation}: Props) => {
  const cargoTypes = useCargoTypes()
  const {setCargoType} = useContext(DimensionsContext)
  const {top} = useSafeAreaInsets();


  const renderCargoItem: ListRenderItem<CargoType> = useCallback(({item}) => {
    const onItemPress = () => {
      setCargoType(item)
      navigation.navigate('Weight')
    }
    return<Pressable onPress={onItemPress} style={styles.cargoItem} key={item.Ref}>
      <Text>{item.Ref}</Text>
    </Pressable>
  }, [])

  return (
      <>
        <VerticalSpace height={top + 64} />
        {cargoTypes.isLoading ? (
            <ActivityIndicator />
        ) : (
            <View style={styles.container}>
            <FlatList
                data={cargoTypes.data}
                renderItem={renderCargoItem}
                keyExtractor={item => item.Ref}
            />
            </View>
        )}
      </>
  );

}

export default ChooseCargoTypeScreen;

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
