import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import DQ_Paragraph from './DQ_Paragraph';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DQ_Contract({
  item,
  setExcludedData,
  contractAdditional,
  groupCode
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

    const actions = [
      {
        attr: "canRenewPolicy",
        value: item.canRenewPolicy,
        title: 'Renew',
        iconName: 'plus'
      },
      {
        attr: "canPrintPolicy",
        value: item.canPrintPolicy,
        title: 'Print Policy',
        iconName: 'printer'
      },
      {
        attr: "canPrintAlpSoa",
        value: item.canPrintAlpSoa,
        title: 'Print SOA',
        iconName: 'file-text'
      },
      {
        attr: "hasLegalAddress",
        value: item.hasLegalAddress,
        title: 'Legal Address',
        iconName: 'map-marker'
      },
      {
        attr: "hasBeneficiary",
        value: item.hasBeneficiary,
        title: 'Beneficiary',
        iconName: 'user-plus'
      },
      {
        attr: "hasDuePremiums",
        value: item.hasDuePremiums,
        title: 'Due Premiums',
        iconName: 'dollar-sign'
      },
      {
        attr: "hasClaims",
        value: item.hasClaims,
        title: 'Claims',
        iconName: 'file-invoice'
      },
      {
        attr: "hasPendingRequests",
        value: item.hasPendingRequests,
        title: 'Pending Requests',
        iconName: 'hourglass-half'
      }
    ];

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
    padding:5
  },
  additionalDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor:"#3cc8f0",
    padding:5
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
