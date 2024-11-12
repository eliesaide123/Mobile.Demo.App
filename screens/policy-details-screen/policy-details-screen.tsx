import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyIconDescription from '../../components/DQ_PolicyIconDescription';
import DQ_TabView from '../../components/DQ_TabView';
import { GetPolicyDetails } from './service/motor-policy-details-service';
import DQ_Contract from '../../components/DQ_Contract'; // Importing the DQ_Contract component
import { GetLifePolicyDetails } from './service/life-policy-details-service';
import DQ_Vehicle from '../../components/DQ_Vehicle';

const imageMapping: { [key: string]: any } = {
  health: require('../../assets/images/health.png'),
  life: require('../../assets/images/life.png'),
  motor: require('../../assets/images/motor.png'),
  property: require('../../assets/images/property.png'),
  personal: require('../../assets/images/personal.png'),
  travel: require('../../assets/images/travel.png'),
  investment: require('../../assets/images/investment.png'),
  expat: require('../../assets/images/expat.png'),
  liability: require('../../assets/images/liability.png'),
  marine: require('../../assets/images/marine.png'),
  engrisk: require('../../assets/images/engrisk.png'),
  other: require('../../assets/images/other.png'),
  protection: require('../../assets/images/protection.png'),
};

const initialTab = [
  {
    key: 'contract',
    title: 'Contract',
    content: (
      <View>
        <Text>Contract</Text>
      </View>
    ),
  },
  {
    key: 'Vehicle',
    title: 'Vehicle',
    content: (
      <View>
        <Text>Vehicle Details</Text>
      </View>
    ),
  },
  {
    key: 'Insured',
    title: 'Insured',
    content: (
      <View>
        <Text>Insured Details</Text>
      </View>
    ),
  },
  {
    key: 'Insured Covers',
    title: 'Insured Covers',
    content: (
      <View>
        <Text>Insured Covers</Text>
      </View>
    ),
  },
  {
    key: 'Dependent',
    title: 'Dependent',
    content: (
      <View>
        <Text>Dependent Details</Text>
      </View>
    ),
  },
  {
    key: 'Insured Risks',
    title: 'Insured Risks',
    content: (
      <View>
        <Text>Insured Risks</Text>
      </View>
    ),
  },
];

export default function PolicyDetails({ navigation, route }: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setPolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>(initialTab);
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [policyData, setPolicyData] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [policyDetailsURI, setPolicyDetailsURI] = useState<any>(null);

  useEffect(() => {
    const {
      policyNo: _policyNo,
      groupCode: grpCode,
      pin: _pin,
      role: _role,
      userId: _userId,
      policyDetailsURI: _policyDetailsURI
    } = route.params;
    setGroupCode(grpCode);
    setPolicyNo(_policyNo);
    setPin(_pin);
    setRole(_role);
    setUserId(_userId)
    setPolicyDetailsURI(_policyDetailsURI)

    let filteredTabs = initialTab;

    const fetchPolicyDetails = async () => {
      const result = await GetPolicyDetails(
        _userId,
        _policyNo,
        _pin,
        _role,
        _policyDetailsURI
      );

      const policyDetails = result.policyDetails;
      setPolicyData(policyDetails);

      const keyArr = Object.keys(policyDetails);
      for(var i=1; i< keyArr.length; i++){
        if(policyDetails[keyArr[i]].length > 0){
          
        }
      }
    };

    
    switch (grpCode.toLowerCase()) {
      case 'motor':
        filteredTabs = initialTab.filter(
          tab => tab.key === 'contract' || tab.key === 'Vehicle',
        );
        fetchPolicyDetails();
        break;
      case 'health':
        filteredTabs = initialTab.filter(
          tab => tab.key === 'contract' || tab.key === 'Insured',
        );
        fetchPolicyDetails();
        break;
      case 'life':
        filteredTabs = initialTab.filter(
          tab =>
            tab.key === 'contract' ||
            tab.key === 'Insured' ||
            tab.key === 'Insured Covers',
        );
        fetchPolicyDetails()
        break;
      case 'investment':
        filteredTabs = initialTab.filter(
          tab =>
            tab.key === 'contract' ||
            tab.key === 'Insured' ||
            tab.key === 'Dependent' ||
            tab.key === 'Insured Covers',
        );
        fetchPolicyDetails();
        break;
      case 'travel':
        filteredTabs = initialTab.filter(
          tab => tab.key === 'contract' || tab.key === 'Insured',
        );
        fetchPolicyDetails();
        break;
      case 'personal':
        filteredTabs = initialTab.filter(
          tab =>
            tab.key === 'contract' ||
            tab.key === 'Insured' ||
            tab.key === 'Insured Covers',
        );
        fetchPolicyDetails();
        break;
      case 'expat':
        filteredTabs = initialTab.filter(
          tab => tab.key === 'contract' || tab.key === 'Insured Covers',
        );
        fetchPolicyDetails();
        break;
      case 'property':
        filteredTabs = initialTab.filter(
          tab =>
            tab.key === 'contract' ||
            tab.key === 'Insured Risks' ||
            tab.key === 'Insured Covers',
        );
        fetchPolicyDetails();
        break;
      case 'other':
        filteredTabs = initialTab.filter(tab => tab.key === 'contract');
        fetchPolicyDetails();
        break;
      default:
        break;
    }

    setTabs(filteredTabs);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.rootElement}>
      <DQ_BaseHeader
        variant="textCenter"
        textCenter={groupCode}
        press={() => navigation.goBack()}
      />
      <View>
        {groupCode && policyNo && (
          <DQ_PolicyIconDescription
            src={imageMapping[groupCode]}
            policyNo={policyNo}
          />
        )}
      </View>
      <DQ_TabView
        tabs={tabs.map(tab => ({
          ...tab,
          content:
            tab.key === 'contract' && policyData ? (
              <View style={styles.tabContent}>
                <DQ_Contract item={policyData.contract[0]}/>                
              </View>
            ) : tab.key === 'Vehicle' && policyData ? (
              <View style={styles.tabContent}>
                <DQ_Vehicle item={policyData.vehicle[0]}/>                    
              </View>
            ) : (
              <View style={styles.tabContent}>
                <Text>Loading...</Text>
              </View>
            ),
        }))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  tabContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ebebeb',
  },
});
