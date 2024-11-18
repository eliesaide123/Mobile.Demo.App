import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DQ_InsuredCard from './DQ_InsuredCard';

export default function DQ_Insured({ item }: any) {
  const excludeKeys = ['riskNo', 'insuredData'];

  const isAllCoversNull = (covers: Record<string, any>) => {
    if (!covers) return true;
  
    return Object.entries(covers).every(([key, value]) => {
      return excludeKeys.includes(key) || value === null;
    });
  };
  
  return (
    <ScrollView style={styles.contractContainer}>
      <View>        
        {Array.isArray(item) && item.length > 0 && (          
          item.map((obj, index) => {
            console.log(obj)
            const locked = isAllCoversNull(obj);
            return(
              <View key={index} style={{marginVertical:7}}>
                <DQ_InsuredCard title={obj["insuredData"]} count={item.length} locked={locked}>
                {typeof obj === 'object' && obj !== null ? (
                  Object.entries(obj).map(([key, value]) => (
                    !excludeKeys.includes(key) && value !== null && (
                      
                        <View key={key} style={styles.contractRow}>
                        <Text style={styles.label}>{key}</Text>
                        <Text style={styles.value}>{String(value)}</Text>
                      </View>
                    )
                  ))
                ) : (
                  <Text>{String(obj)}</Text>
                )}
              </DQ_InsuredCard>
              </View>
            )
          })
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
    width: '100%'    
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
