import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function DQ_TextBox({ 
    placeholder = 'Enter text', 
    value, 
    onChangeText, 
    keyboardType = 'default',
    secureTextEntry = false,
    backgroundColor = 'white',
    textColor = '#333',
    borderColor = 'black'
} : any) {
    return (
        <View style={[styles.container, {backgroundColor, borderColor }]}>
            <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder={placeholder}
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 3,
        borderWidth: 1,
        marginVertical: 8,
    },
    input: {
        fontSize: 16,
        height: 40,
    },
});
