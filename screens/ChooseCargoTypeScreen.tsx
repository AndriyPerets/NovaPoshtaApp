import {StyleSheet, View, Text, Button, ActivityIndicator, Pressable, FlatList, ListRenderItem} from "react-native";
import React, {useCallback, useContext} from "react";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {MainStackParamList} from "../navigation/MainNavigator";
import {useCargoTypes} from "../queries/dictionaries";
import {DimensionsContext} from "../App";
import {CargoType} from "../API/dictionaries";
import {StackScreenProps} from "@react-navigation/stack";

type Props = StackScreenProps<MainStackParamList, 'ChooseCargoTypeScreen'>;

const ChooseCargoTypeScreen = ({navigation}: Props) => {
  const cargoTypes = useCargoTypes()
  const {setCargoType} = useContext(DimensionsContext)

  const renderCargoItem: ListRenderItem<CargoType> = useCallback(({item}) => {
    const onItemPress = () => {
      setCargoType(item)
      navigation.navigate('Weight')
    }
    return <Pressable onPress={onItemPress} style={styles.cargoItem} key={item.Ref}>
      <Text>{item.Ref}</Text>
    </Pressable>
  }, [])

  return (
    cargoTypes.isLoading ? <ActivityIndicator/> :
      <FlatList data={cargoTypes.data} renderItem={renderCargoItem} keyExtractor={item => item.Ref}/>
  );
}

export default ChooseCargoTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cargoItem: {
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 4,
  },
});
