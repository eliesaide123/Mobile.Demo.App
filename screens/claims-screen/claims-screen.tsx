import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DQ_BaseHeader from '../../components/DQ_BaseHeader'
import DQ_Button from '../../components/DQ_Button'
import DQ_TextBox from '../../components/DQ_TextBox'
import DQ_Dropdown from '../../components/DQ_Dropdown'
import { GetClaims } from './service/claims-service'
import DQ_Paragraph from '../../components/DQ_Paragraph'

export default function ClaimsScreen({navigation, route} : any) {
  
  const [claimNumber, setClaimNumber] = useState<string>();

  useEffect(() => {
    const {PolicyNo, OS_Only} = route.params
    const result = GetClaims(PolicyNo, OS_Only)
    console.log("resultCLAIMS: " + result)
    const claimDetails = result.response?.claimsData?.policies[0]?.outstandingClaims[0];
    setClaimNumber(JSON.stringify(claimDetails));
  }, [route.params])
  return (
    <SafeAreaView style={styles.mainContainer}>
       <DQ_BaseHeader press={()=> navigation.goBack()} variant="textCenter" />
        <View>
          <DQ_Paragraph content={claimNumber} textColor="black"/>
          <DQ_Paragraph content="Claim Number" textColor="black"/>
          <DQ_Paragraph content="Claim Amount" textColor="black"/>          
        </View>
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