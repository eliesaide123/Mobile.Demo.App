import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyIconDescription from '../../components/DQ_PolicyIconDescription';


const imageMapping: {[key: string]: any} = {
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
];


export default function PolicyDetails({navigation, route}: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setpolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>(initialTab);


  useEffect(() => {
    const {policyNo: _policyNo, groupCode: grpCode} = route.params;
    setGroupCode(grpCode);
    setpolicyNo(_policyNo);
  });
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
      <View>      
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
  },
});
