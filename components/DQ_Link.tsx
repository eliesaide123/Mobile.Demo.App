import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

function DQ_Link({textAlign, content, textColor, underline, goTo, fontSize, uppercased}: any) {
  return (
    <Pressable>
      <Text
        style={{
          color: textColor,
          textDecorationLine: underline ? 'underline' : 'none',
          textAlign: textAlign,
          fontSize:fontSize,
          textTransform: uppercased ? 'uppercase' : 'capitalize'
        }}>
        {content}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({})

export default DQ_Link;