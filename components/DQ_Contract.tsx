// DQ_Contract.tsx
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Define the contract details interface
interface ContractProps {
  productName: string;
  policyHolder: string;
  inception: string;
  expiry: string;
  currency: string;
  annualPremium: string;
  frequencyPayment: string;
  nextPremium: string;
  agentName: string;
  whoPays: string;
  paymentMode: string;
  policyStatus: string;
}

const DQ_Contract: React.FC<ContractProps> = ({
  productName,
  policyHolder,
  inception,
  expiry,
  currency,
  annualPremium,
  frequencyPayment,
  nextPremium,
  agentName,
  whoPays,
  paymentMode,
  policyStatus,
}) => {
  return (
    <View style={styles.contractContainer}>      
      <Text>Product Name: {productName}</Text>
      <Text>Policy Holder: {policyHolder}</Text>
      <Text>Inception: {inception}</Text>
      <Text>Expiry: {expiry}</Text>
      <Text>Currency: {currency}</Text>
      <Text>Annual Premium: {annualPremium}</Text>
      <Text>Payment Frequency: {frequencyPayment}</Text>
      <Text>Next Premium: {nextPremium}</Text>
      <Text>Agent Name: {agentName}</Text>
      <Text>Who Pays: {whoPays}</Text>
      <Text>Payment Mode: {paymentMode}</Text>
      <Text>Policy Status: {policyStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contractContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flex:1
  },
  contractHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default DQ_Contract;
