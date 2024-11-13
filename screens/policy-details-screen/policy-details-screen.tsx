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
import { GetPolicyDetails } from './service/get-policy-details-service';
import DQ_Contract from '../../components/DQ_Contract';
import DQ_Vehicle from '../../components/DQ_Vehicle';
import DQ_Insured from '../../components/DQ_Insured';
import DQ_InsuredCovers from '../../components/DQ_InsuredCovers';
import _shared from '../common';
import DQ_Loader from '../../components/DQ_Loader';

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

const componentMapping: {[key: string]: any} = {
  contract: DQ_Contract,
  vehicle: DQ_Vehicle,
  insuredDep: DQ_Contract,
  insuredData: DQ_Insured,
  insuredCoverData: DQ_InsuredCovers,
};

const titleMapping: {[key: string]: string} = {
  contract: 'Contract',
  vehicle: 'Vehicle',
  insuredDep: 'Dependant',
  insuredData: 'Insured',
  insuredCoverData: 'Insured Covers',
};

export default function PolicyDetails({navigation, route}: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setPolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>([]);
  const [policyData, setPolicyData] = useState<any>(null);
  const [policyDetailsURI, setPolicyDetailsURI] = useState<any>(null);
  const [policyInsCoversURI, setPolicyInsCoversURI] = useState<any>(null);
  const [clickedFAB, setClickedFAB] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const {
          policyNo: _policyNo,
          groupCode: grpCode,
          policyDetailsURI: _policyDetailsURI,
          policyInsCoversURI: _policyInsCoversURI,
        } = route.params;

        setGroupCode(grpCode);
        setPolicyNo(_policyNo);
        setPolicyDetailsURI(_policyDetailsURI);
        setPolicyInsCoversURI(_policyInsCoversURI);

        // Fetch the policy details only if they haven't been fetched yet
        if (policyData) return;

        setIsLoading(true);

        const result = await GetPolicyDetails(
          _shared.userId,
          _policyNo,
          _shared.pin,
          _shared.role,
          _policyDetailsURI,
        );

        const policyDetails = result.policyDetails;
        const keysArr = Object.keys(policyDetails);

        const groupedKeys = groupAndReplaceRelatedKeys(keysArr);

        const updatedTabs: any[] = [];
        Object.keys(componentMapping).forEach(key => {
          if (policyDetails[key] && (Array.isArray(policyDetails[key]) ? policyDetails[key].length > 0 : true)) {
            const TabContent = componentMapping[key];
            updatedTabs.push({
              key: titleMapping[key],
              title: titleMapping[key],
              content: <TabContent item={policyDetails[key]} />,
            });
          }
        });

        setTabs(updatedTabs);
        setPolicyData(policyDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicyDetails();
  }, [route.params, policyData]);

  const groupAndReplaceRelatedKeys = (keys: any) => {
    let groupedKeys: any[] = [];
    let visited = new Set();
    keys.forEach((key1: any) => {
      if (visited.has(key1)) return;
      let relatedGroup = [key1];
      keys.forEach((key2: any) => {
        if (key1 !== key2 && !visited.has(key2) && key2.includes(key1)) {
          relatedGroup.push(key2);
          visited.add(key2);
        }
      });
      groupedKeys.push(relatedGroup);
      visited.add(key1);
    });

    return groupedKeys.map(group => (group.length > 1 ? group : group[0]));
  };

  const handleOverlayClick = () => {
    setClickedFAB(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.rootElement}>
      <DQ_BaseHeader
        variant="textCenter"
        textCenter={groupCode}
        press={() => navigation.goBack()}
      />
      {clickedFAB && <View style={styles.overlay} onTouchStart={handleOverlayClick} />}

      <View>
        {groupCode && policyNo && (
          <DQ_PolicyIconDescription
            src={imageMapping[groupCode]}
            policyNo={policyNo}
            clickedFAB={clickedFAB}
            setClickedFAB={setClickedFAB}
          />
        )}
      </View>
      {isLoading ? (
        <DQ_Loader loading={isLoading} />
      ) : (
        <DQ_TabView tabs={tabs} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  },
});
