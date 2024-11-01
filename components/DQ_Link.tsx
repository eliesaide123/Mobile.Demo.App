import { Pressable, Text } from 'react-native'
import React from 'react'

function DQ_Link({textAlign, content, textColor, underline, goTo, fontSize, uppercased, fontFamily = 'Nexa Regular',}: any) {
  return (
    <Pressable>
      <Text
        style={{
          color: textColor,
          textDecorationLine: underline ? 'underline' : 'none',
          textAlign: textAlign,
          fontSize:fontSize,
          fontFamily,
          textTransform: uppercased ? 'uppercase' : 'capitalize'
        }}>
        {content}
      </Text>
    </Pressable>
  );
}


export default DQ_Link;