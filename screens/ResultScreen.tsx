import {StyleSheet, View, Text, Button} from "react-native";
import React from "react";

export default function ResultScreen({ route, navigation }: any) {
    const { result } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.result}>{result}</Text>
            <Button
                title="Back to Route"
                onPress={() => navigation.navigate('Route')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    result: {
        fontSize: 20,
        margin: 10,
    },
});
