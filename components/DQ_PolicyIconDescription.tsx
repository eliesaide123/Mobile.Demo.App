import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DQ_Paragraph from './DQ_Paragraph'
import DQ_FAB from './DQ_FAB'

export default function DQ_PolicyIconDescription({src, policyNo, clickedFAB, setClickedFAB}: any) {
  return (
    <View style={styles.Image_Container}>
        <View style={styles.Inline_Image}>
          <Image
            source={src}
            style={styles.Image}
            resizeMode="contain"
          />
          <DQ_Paragraph content={policyNo} fontFamily='Nexa Light' />
        </View>
        <View style={styles.fab}>
          <DQ_FAB clicked={clickedFAB} setClicked={setClickedFAB}/>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    Image_Container: {
        padding: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        gap:30
      },
      Image: {
        width: 40,
        height: 40,
        padding: 10,
        tintColor:'#0160ae'
      },
      Inline_Image: {
        padding: 7,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap:10,
      },
      fab:{
        position:'static',
        top:3,
        right:-30,
        zIndex:50
      }
})