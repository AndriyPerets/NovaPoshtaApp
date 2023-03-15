import { useState} from "react";
import {TextInput, View, StyleSheet, Text, Button} from "react-native";

// export const volumeProperties = {
//     volume: "0.000125",
// };

export default function VolumeScreen({navigation}: any) {
    const [height, setHeight] = useState<string>("5");
    const [width, setWidth] = useState<string>("5");
    const [length, setLength] = useState<string>("5");
    const [volume, setVolume] = useState<number>(0.000125);

    const handleHeightInput = (value: string) => {
        setHeight((prevNum)=>{
            const newValue = value.trim();
            // проверка на допустимые символы в числе
            const validChars = /^[0-9]*\.?[0-9]*$/;
            if (!validChars.test(newValue)) {
                return prevNum;
            }
            return newValue;
        });
    };

    const handleWidthInput = (value: string) => {
        setWidth((prevNum)=>{
            const newValue = value.trim();
            // проверка на допустимые символы в числе
            const validChars = /^[0-9]*\.?[0-9]*$/;
            if (!validChars.test(newValue)) {
                return prevNum;
            }
            return newValue;
        });
    };

    const handleLengthInput = (value: string) => {
        setLength((prevNum) => {
            const newValue = value.trim();
            // проверка на допустимые символы в числе
            const validChars = /^[0-9]*\.?[0-9]*$/;
            if (!validChars.test(newValue)) {
                return prevNum;
            }
            return newValue;
        });
    };


    const handleClearAll = ()=>{
        setHeight("1");
        setWidth("1");
        setLength("1");
        setVolume(0.000125);
    };

    const calculateVolume = () => {
        if (height !== undefined && width !== undefined && length !== undefined) {
            setVolume(parseFloat(height) * parseFloat(width) * parseFloat(length)*0.000001);
        } else {
            setVolume(0.000125);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.button}>
            <Button
                title="ClearAll"
                onPress={handleClearAll}
            />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.unit}>высота</Text>
                <TextInput
                    style={styles.input}
                    autoFocus={true}
                    value={height}
                    onChangeText={handleHeightInput}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
                <Text style={styles.unit}>cм</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.unit}>ширина</Text>
                <TextInput
                    style={styles.input}
                    value={width}
                    onChangeText={handleWidthInput}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
                <Text style={styles.unit}>cм</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.unit}>длинна</Text>
                <TextInput
                    style={styles.input}
                    value={length}
                    onChangeText={handleLengthInput}
                    keyboardType="numeric"
                    returnKeyType="done"
                />
                <Text style={styles.unit}>cм</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.input}>
                    {!isNaN(volume as number) ? volume : ""}
                    <Text style={styles.unit}>м3</Text>
                </Text>
            </View>
            <View style={styles.button}>
            <Button
                title="Submit"
                onPress={()=>{
                    calculateVolume();
                    navigation.navigate('Weight', {
                        volume
                    });
                }}
            />
            </View>
            <Text style={styles.message}>Введите вес посылки</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:-300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        backgroundColor: "#ddd",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        margin: 2,
        opacity: 0.8,
    },
    input: {
        margin: 10,
        flex: 1,
        color: "#0C1F1F",
        textAlign: "right",
    },
    unit: {
        marginHorizontal: 5,
        color: "#0C1F1F",
    },
    button: {
        backgroundColor: '#ddd',
        color: '#FFFFFF',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        opacity: 0.9,
    },
    message:{
        fontSize:30,
        opacity:0.5,
    }
});
