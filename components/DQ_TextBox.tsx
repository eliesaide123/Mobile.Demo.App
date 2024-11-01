import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default function DQ_TextBox({ 
    placeholder = 'Enter text', 
    value, 
    onChangeText, 
    keyboardType = 'default',
    secureTextEntry = false,
    backgroundColor = 'white',
    textColor = '#333',
    borderColor = 'black',
    hintText = undefined,
    fontFamily = 'Nexa Regular',
} : any) {

  const fF = fontFamily.toString();

  function handleChangeText(e: string) {
    onChangeText(e);
  }
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.container, {backgroundColor, borderColor}]}>
          <TextInput
            style={[styles.input, {color: textColor, fontFamily: fF}]}
            placeholder={placeholder}
            placeholderTextColor="#888"
            value={value}
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {hintText && <Text style={{color: borderColor, marginHorizontal:5, fontFamily}}>{hintText}</Text>}
      </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        marginVertical:8,
    },
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 3,
        borderWidth: 1,
    },
    input: {
        fontSize: 16,
        height: 40,
    },
});
