import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DQ_Paragraph from '../../components/DQ_Paragraph';
// import DQ_PolicyCard from '../../components/DQ_PolicyCard';

export default function AgentResult() {

    const imageMapping: {[key: string]: any} = {
        'dq.png': require('../../assets/images/DataQuest_Logo.png'),
        'agent.png': require('../../assets/images/agent.png'),
      };

  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.dqLogo}>
        <Image
          source={imageMapping['dq.png']}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.agentLogo}>
        <Image 
          source={imageMapping['agent.png']}
          resizeMode="contain"
          style={styles.AgentlogoImage}
        />
        <DQ_Paragraph content="p234" fontFamily='Nexa Bold' fontSize={20} textAlign='center'/>
      </View>
      {/* <FlatList
              data={policyList}
              renderItem={({item}) => (
                <DQ_PolicyCard
                  src={imageMapping[groupCode]}
                  item={item}
                  press={()=>{navigation.navigate('ProductPolicy',{policyNo: item.policyNo, groupCode, pin, role})}}
                  keyExtractor={(item: any) => item.policyNo.toString()}
                />
              )}
            /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex : 1,
    },

    dqLogo: {
        flex : 0.15,
        padding:20,
    },

    logoImage: {
        width: 200,
        height: 100,
        alignSelf: 'center',
      },

    agentLogo: {
        flex : 0.25,
        padding:10,
        gap:20
    },

    AgentlogoImage : {
        width: 120,
        height:120,
        alignSelf: 'center',
    },
})