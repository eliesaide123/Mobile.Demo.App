import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DQ_InsuredCard from './DQ_InsuredCard';
import DQ_Paragraph from './DQ_Paragraph';
import _shared from '../screens/common';
import {GetAdvancedLifeCover} from '../screens/policy-details-screen/service/get-advanced-life-cover-service';
import {
  GetGenRisk,
  GetGenRiskCovers,
} from '../screens/policy-details-screen/service/get-genrisk-service';

export default function DQ_InsuredRisks({
  item,
  policyNo,
  coversURL,
  policyDataURI,
}: any) {
  const [items, setItems] = useState([]);
  const [covers, setCovers] = useState([]);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const Get_Covers = async () => {
      console.log(JSON.stringify(item));
      const result = await GetGenRisk(
        _shared.userId,
        policyNo,
        _shared.pin,
        _shared.role,
        item[0]?.riskNo,
        coversURL,
        policyDataURI,
      );
      const _items = result?.riskDetails?.dataItems || [];
      setItems(_items);
      setCurrency(result?.currency);
      const resultCovers = await GetGenRiskCovers(
        _shared.userId,
        policyNo,
        _shared.pin,
        _shared.role,
        item[0]?.riskNo,
        coversURL,
        policyDataURI,
      );

      const _covers = resultCovers?.riskDetails?.covers || [];
      setCovers(_covers);
      console.log(_covers);
    };
    Get_Covers();
  }, [coversURL, policyDataURI, policyNo, item]);

  const getDynamicFontSize = (text: any) => {
    const length = String(text).length;
    if (length <= 10) return 16; // Short text, larger font
    if (length <= 20) return 14; // Medium text, medium font
    if (length <= 30) return 12; // Long text, smaller font
    return 10; // Very long text, smallest font
  };

  return (
    <ScrollView style={styles.contractContainer}>
      <View>
        {Array.isArray(item) && item.length > 0 ? (
          item.map((obj, index) => (
            <DQ_InsuredCard
              title={obj['riskType']}
              key={index}
              count={item.length}>
              <View style={styles.additionalDataRow}>
                <View style={styles.header}>
                  <DQ_Paragraph
                    content={`Item Insured`}
                    textColor="white"
                    fontFamily="Nexa Bold"
                    fontSize={13}
                    textAlign="center"
                  />
                </View>
                <View style={styles.header}>
                  <DQ_Paragraph
                    content={`Sum Insured / USDF`}
                    textColor="white"
                    fontFamily="Nexa Bold"
                    fontSize={13}
                    textAlign="center"
                  />
                </View>
              </View>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((item: any, itemIndex) => (
                  <View key={itemIndex} style={styles.propertyRow}>
                    <View style={styles.contractRow}>
                      <DQ_Paragraph
                        content={item['itemDesc']}
                        fontFamily="Nexa Bold"
                        fontSize={14}
                        textColor="black"
                        textAlign="left"
                        textWidth={150}
                      />
                      <DQ_Paragraph
                        content={item['itemSI']}
                        fontFamily="Nexa Light"
                        fontSize={14}
                        textColor="black"
                        textAlign="right"
                        textWidth={150}
                      />
                    </View>
                    {item?.itemCovers.map((i: any) => (
                      <View key={i.itemCoverName} style={styles.description}>
                        <DQ_Paragraph
                          content={i.itemCoverName}
                          fontFamily="Nexa Light"
                          fontSize={getDynamicFontSize(
                            i.itemCoverName + 'extratextextra',
                          )}
                          textColor="#727272"
                        />
                      </View>
                    ))}
                  </View>
                ))
              ) : (
                <Text>No data available</Text>
              )}
            </DQ_InsuredCard>
          ))
        ) : (
          <Text>No data available</Text>
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
    width: '100%',
  },
  contractRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyRow: {
    paddingVertical: 9,
    width: '114%',
    marginHorizontal: -20,
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  description:{
    paddingHorizontal:15,
    marginTop: 5
  },
  additionalDataRow: {
    position: 'relative',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor: '#6e6e6e',
    flexWrap: 'wrap',
    padding: 15,
    gap: 20,
    width: '128%',
    height: '100%',
    marginHorizontal: -40,
    marginBottom: 7,
  },
  header: {
    flex: 0.4,
  },
  label: {
    width: 50,
  },
});
