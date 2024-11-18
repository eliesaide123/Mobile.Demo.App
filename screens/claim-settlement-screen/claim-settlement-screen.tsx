import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';

export default function ClaimSettlement({navigation, route}: any) {
  const [policyNo, setPolicyNo] = useState<string>('');
  const [imsClaimsNo, setImsClaimsNo] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [imsClaimRefLabel, setIMSClaimRefLabel] = useState<string>('');
  const [claimAmountLabel, setClaimAmountLabel] = useState<string>('');
  const [dateLabel, setDateLabel] = useState<string>('');
  const [toBeSettledAmount, setToBeSettledAmount] = useState<string>('');

  useEffect(() => {
    const {
      policyNo: _policyNo,
      imsClaimsNo: _imsClaimsNo,
      action: _action,
      claimNo: _imsClaimRefLabel,
      claimAmount: _settledAmountLabel,
      date: _occuredOnLabel,
      toBeSettledAmount: _toBeSettledAmount
    } = route.params;
    setPolicyNo(_policyNo);
    setImsClaimsNo(_imsClaimsNo);
    setAction(_action);
    setIMSClaimRefLabel(_imsClaimRefLabel);
    setClaimAmountLabel(_settledAmountLabel);
    setDateLabel(_occuredOnLabel);
    setToBeSettledAmount(_toBeSettledAmount)
  }, [route.params]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DQ_BaseHeader
        press={() => navigation.goBack()}
        variant="textCenter"
        textCenter="MY CLAIMS"
      />
      <View style={styles.innerContainer}>
        <DQ_Paragraph content="Claim Settlement" textAlign="center" />
      </View>
      <View style={styles.container}>
        <View style={styles.spaceBetweenContainer}>
          <DQ_Paragraph content={imsClaimRefLabel} textColor="black" />
          <DQ_Paragraph content={imsClaimsNo} textColor="#5392c4" />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <DQ_Paragraph content={claimAmountLabel} textColor="black" />
          <DQ_Paragraph content={toBeSettledAmount} textColor="#5392c4" />
        </View>
        <View style={styles.spaceBetweenContainer}>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    marginTop: 20,
  },
  container: {
    padding: 15,
  },
  spaceBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
