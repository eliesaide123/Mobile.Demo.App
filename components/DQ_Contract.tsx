import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import DQ_Paragraph from './DQ_Paragraph';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DQ_Contract({
  item,
  contractAdditional,
  groupCode,
}: any) {
  const excludeKeys = [
    'firstInception',
    'canRenewPolicy',
    'canPrintPolicy',
    'canPrintAlpSoa',
    'hasLegalAddress',
    'hasBeneficiary',
    'hasDuePremiums',
    'hasClaims',
    'hasPendingRequests',
  ];

    const actions : any[] = useMemo(()=>(
      [
        {
          attr: "canPrintPolicy",
          value: String(item[0].canPrintPolicy),
          title: 'Print Policy',
          iconName: 'person-circle-plus',
        },
        {
          attr: "hasBeneficiary",
          value: String(item[0].hasBeneficiary),
          title: 'Beneficiary',
          iconName: 'person-circle-plus',
        },
        {
          attr: "hasLegalAddress",
          value: String(item[0].hasLegalAddress),
          title: 'Legal Address',
          iconName: 'location-dot',
        },
        {
          attr: "hasClaims",
          value: String(item[0].hasClaims),
          title: 'Policy Claims',
          iconName: 'file-pen',
        },
        {
          attr: "hasDuePremiums",
          value: String(item[0].hasDuePremiums),
          title: 'Due Premiums',
          iconName: 'business-time',
        },
        {
          attr: 'hasPendingRequests',
          value: String(item[0].hasPendingRequests),
          title: 'My Requests',
          iconName: 'clipboard-list',
        },
        {
          attr: "canPrintAlpSoa",
          value: String(item[0].canPrintAlpSoa),
          title: 'Print SOA',
          iconName: 'person-circle-plus',
        },
        {
          attr: "canRenewPolicy",
          value: String(item[0].canRenewPolicy),
          title: 'Renew',
          iconName: 'clipboard-list',
        }
      ]
    ), [item])

    useEffect(()=>{
      const setActions = async()=>{
        await AsyncStorage.setItem('contractActions', JSON.stringify(actions))
      }
      setActions();
    }, [actions])
  

  return (
    <ScrollView
      style={styles.contractContainer}
      contentContainerStyle={styles.scrollContent}>
      <View>
        {typeof item[0] === 'object' && item[0] !== null ? (
          Object.entries(item[0]).map(
            ([key, value]) =>
              !excludeKeys.includes(key) &&
              value !== null && (
                <View key={key} style={styles.contractRow}>
                  <Text style={styles.label}>{key}</Text>
                  <Text style={styles.value}>{String(value)}</Text>
                </View>
              ),
          )
        ) : (
          <Text>{String(item[0])}</Text>
        )}

        {contractAdditional && (
          <View>
            {Object.entries(contractAdditional[0]).map(([key, value], index) => {
              if(key.toLowerCase() == 'plan' || (groupCode.toLowerCase() == 'travel' && index == 0)){
                return(
                  <View key={key} style={styles.additionalDataRow}>
                  <DQ_Paragraph content={key.toLowerCase() == 'plan' ? value + " " + key.substring(0,1).toUpperCase() + key.substring(1,) : "Additional Data" } textColor='white'/>
                </View>
                )
              }
              return (
                !excludeKeys.includes(key) &&
              value !== null && ( <View key={key} style={styles.contractRow}>
                  <Text style={styles.label}>{key}</Text>
                  <Text style={styles.value}>{String(value)}</Text>
                </View>)
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractContainer: {
    padding: 12,
    backgroundColor: '#ebebeb',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contractRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding:5,
  },
  additionalDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor:"#3cc8f0",
    padding:5,
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});
