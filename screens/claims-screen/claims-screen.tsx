import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import {GetClaims} from './service/claims-service';
import DQ_Button from '../../components/DQ_Button';

export default function ClaimsScreen({navigation, route}: any) {
  const [outstandingClaims, setOutStandingClaims] = useState<any>({});
  const [labels, setLabels] = useState<string[]>([]);
  const [policyNo, setPolicyNo] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [allowSettle, setAllowSettle] = useState<boolean>(false)

  const exclusions = [
    'imsClaimNo',
    'policySerno',
    'declaredOn',
    'fnolReference',
    'tpaReference',
    'r2S_Amount',
    'r2S_Status',
    'r2S_Mode',
    'dateSettled',
    'allowSettle',
    'claimNotes',
    'missingDocuments',
    'settleDetails',
  ];

  useEffect(() => {
    const {PolicyNo, OS_Only} = route.params;
    const Get_Claims = async () => {
      const result: any = await GetClaims(PolicyNo, OS_Only);
      if ('response' in result) {
        const allLabels = Object.keys(
          result.response?.claimsData?.policies[0]?.outstandingClaims[0],
        );
        const filteredLabels = allLabels.filter(
          key => !exclusions.includes(key),
        );

        setLabels(filteredLabels);
        setOutStandingClaims(
          result.response?.claimsData?.policies[0]?.outstandingClaims[0],
        );
        setPolicyNo(result.response?.claimsData?.policies[0]?.policyNo);
        setProductName(result.response?.claimsData?.policies[0]?.productName);
        setAllowSettle(result.response?.claimsData?.policies[0]?.outstandingClaims[0].allowSettle)
      }
    };
    Get_Claims();
  }, [route.params]);

  const imsClaimRefLabel: any = labels.find(l => l === 'imsClaimRef');
  const settledAmount: any = labels.find(l => l === 'settledAmount');
  const occuredOn: any = labels.find(l => l === 'occuredOn');
  const claimStatus: any = labels.find(l => l === 'claimStatus');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DQ_BaseHeader press={() => navigation.goBack()} variant="textCenter" />
      <View style={styles.claimCard}>
        <View style={styles.claimsContainer}>
          <View style={styles.leftSection}>
            <View style={styles.claimItem}>
              <View>
                {imsClaimRefLabel && ( <DQ_Paragraph content={imsClaimRefLabel} textColor="black" /> )}
                <DQ_Paragraph content={outstandingClaims.imsClaimRef} />
              </View>
              <View>
                <DQ_Paragraph content={policyNo} textColor="black" />
                <DQ_Paragraph content={productName} />
              </View>
              <View>
                <DQ_Paragraph content={settledAmount} textColor="black" />
                <DQ_Paragraph content={outstandingClaims.settledAmount} />
              </View>
            </View>
          </View>

          {/* Static right-side content */}
          <View style={styles.rightSection}>
            <View>
              <DQ_Paragraph content={occuredOn} textColor="black" />
              <DQ_Paragraph content={outstandingClaims.occuredOn} />
            </View>
            <View>
              <DQ_Paragraph content={claimStatus} textColor="black" />
              <DQ_Paragraph content={outstandingClaims.claimStatus} />
            </View>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          {allowSettle && <DQ_Button title="Payment Method" />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  claimCard: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  claimsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 20,
  },
  claimItem: {
    marginBottom: 10,
    gap: 15,
  },
});
