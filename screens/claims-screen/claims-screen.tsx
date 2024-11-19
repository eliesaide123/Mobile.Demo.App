import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import {GetClaims} from './service/claims-service';
import DQ_Button from '../../components/DQ_Button';
import DQ_Loader from '../../components/DQ_Loader';

export default function ClaimsScreen({navigation, route}: any) {
  const [outstandingClaims, setOutStandingClaims] = useState<any[]>([]); // Changed to an array for multiple claims
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [policyNo, setPolicyNo] = useState<string>('');

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
      setPolicyNo(PolicyNo);
      setIsLoading(true);
      try {
        const result: any = await GetClaims(PolicyNo, OS_Only);

        // Check if the response is valid
        if (result?.response?.claimsData?.policies?.length > 0) {
          const allLabels = Object.keys(
            result.response.claimsData.policies[0].outstandingClaims[0] || {},
          );
          const filteredLabels = allLabels.filter(
            key => !exclusions.includes(key),
          );

          setLabels(filteredLabels);

          // Safe extraction of policies
          const policies = result.response.claimsData.policies;
          setOutStandingClaims(policies);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    Get_Claims();
  }, [route.params]);

  const renderClaimItem = ({ item }: any) => {
    // Labels and data extraction
    const outstandingClaims = item?.outstandingClaims ?? [];
    const imsClaimRefLabel: any = labels.find((l) => l === 'imsClaimRef');
    const settledAmount: any = labels.find((l) => l === 'settledAmount');
    const occuredOn: any = labels.find((l) => l === 'occuredOn');
    const claimStatus: any = labels.find((l) => l === 'claimStatus');
  
    return (
      <FlatList
        data={outstandingClaims}
        keyExtractor={(claim) => claim.policyNo || Math.random().toString()}
        renderItem={({ item: claim }) => {
          const amountToBeSettled = `${item.currency} ${claim.r2S_Amount}`;
          return (
            <View style={styles.claimCard}>
              <View style={styles.claimsContainer}>
                {/* Left Section */}
                <View style={styles.leftSection}>
                  <View style={styles.claimItem}>
                    <View>
                      {imsClaimRefLabel && (
                        <DQ_Paragraph content={imsClaimRefLabel} textColor="black" />
                      )}
                      <DQ_Paragraph content={claim.imsClaimRef} />
                    </View>
                    <View>
                      <DQ_Paragraph content={item.policyNo} textColor="black" />
                      <DQ_Paragraph content={item.productName} />
                    </View>
                    {claim.allowSettle && (
                      <View>
                        <DQ_Paragraph content={settledAmount} textColor="black" />
                        <DQ_Paragraph content={amountToBeSettled} />
                      </View>
                    )}
                  </View>
                </View>
  
                {/* Right Section */}
                <View style={styles.rightSection}>
                  <View>
                    <DQ_Paragraph content={occuredOn} textColor="black" />
                    <DQ_Paragraph content={claim.occuredOn} />
                  </View>
                  <View>
                    <DQ_Paragraph content={claimStatus} textColor="black" />
                    <DQ_Paragraph content={claim.claimStatus} />
                  </View>
                </View>
              </View>
  
              {/* Payment Button */}
              <View style={{ alignSelf: 'center' }}>
                {claim.allowSettle && (
                  <DQ_Button
                    title="Payment Method"
                    onPress={() => {
                      navigation.navigate('ClaimsSettlement', {
                        policyNo: item.policyNo,
                        imsClaimsNo: claim.imsClaimNo,
                        imsClaimsRef: claim.imsClaimRef,
                        toBeSettledAmount: amountToBeSettled,
                        claimNo: imsClaimRefLabel,
                        claimAmount: settledAmount,
                        notes: claim.claimNotes,
                        settleDetails: claim.settleDetails,
                      });
                    }}
                  />
                )}
              </View>
            </View>
          );
        }}
      />
    );
  };
  

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DQ_BaseHeader
        press={() => navigation.goBack()}
        variant="textCenter"
        textCenter="MY CLAIMS"
      />
      {isLoading ? (
        <DQ_Loader loading={isLoading} />
      ) : (
        <FlatList
          data={outstandingClaims}
          keyExtractor={item => item.policyNo}
          renderItem={renderClaimItem}
        />
      )}
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
