import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DQ_BaseHeader from '../../components/DQ_BaseHeader'
import DQ_Button from '../../components/DQ_Button'
import DQ_TextBox from '../../components/DQ_TextBox'
import DQ_Dropdown from '../../components/DQ_Dropdown'
import { GetClaims } from './service/claims-service'

export default function ClaimsScreen({navigation, route} : any) {
  useEffect(() => {
    const {PolicyNo, OS_Only} = route.params
    GetClaims(PolicyNo, OS_Only)
  }, [route.params])
  return (
    <SafeAreaView style={styles.mainContainer}>
       <DQ_BaseHeader press={()=> navigation.goBack()} variant="textCenter" />
        <View>

        </View>
       <View>
        
       </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1
  },
  btnSubmit:{
    padding: 20,
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',        
  }
})