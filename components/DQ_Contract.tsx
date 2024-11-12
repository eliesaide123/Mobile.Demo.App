import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function DQ_Contract({ item }: any) {
  
  const excludeKeys = ['firstInception', 'canRenewPolicy', 'canPrintPolicy', 'canPrintAlpSoa', 'hasLegalAddress', 'hasBeneficiary', 'hasDuePremiums', 'hasClaims', 'hasPendingRequests'];

  return (
    <ScrollView style={styles.contractContainer}>
      <View>        
        {typeof item === 'object' && item !== null ? (
          Object.entries(item).map(([key, value]) => (
            !excludeKeys.includes(key) && value !== null && (
              <View key={key} style={styles.contractRow}>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>{String(value)}</Text>
              </View>
            )
          ))
        ) : (
          <Text>{String(item)}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractContainer: {
    padding: 12,
    backgroundColor: '#ebebeb',
    flex: 1,
  },
  contractRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
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
