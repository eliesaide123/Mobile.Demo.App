import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyIconDescription from '../../components/DQ_PolicyIconDescription';
import DQ_TabView from '../../components/DQ_TabView';
import { GetPolicyDetails } from './service/get-policy-details-service';
import DQ_Contract from '../../components/DQ_Contract';
import DQ_Vehicle from '../../components/DQ_Vehicle';
import DQ_Insured from '../../components/DQ_Insured';

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

const componentMapping: { [key: string]: any } = {
  "contract": DQ_Contract,
  "vehicle": DQ_Vehicle,
  "insuredDep": DQ_Contract,
  "insuredData": DQ_Insured,
  "insuredCoverData": DQ_Contract,
};

const titleMapping: { [key: string]: string } = {
  "contract": "Contract",
  "vehicle": "Vehicle",
  "insuredDep": "Dependant",
  "insuredData": "Insured",
  "insuredCoverData": "Insured Covers",
};

export default function PolicyDetails({ navigation, route }: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setPolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>([]);
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [policyData, setPolicyData] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [policyDetailsURI, setPolicyDetailsURI] = useState<any>(null);
  const [clickedFAB, setClickedFAB] = useState<boolean>(false);

  useEffect(() => {
    const {
      policyNo: _policyNo,
      groupCode: grpCode,
      pin: _pin,
      role: _role,
      userId: _userId,
      policyDetailsURI: _policyDetailsURI,
    } = route.params;

    // Initialize state variables from route params
    setGroupCode(grpCode);
    setPolicyNo(_policyNo);
    setPin(_pin);
    setRole(_role);
    setUserId(_userId);
    setPolicyDetailsURI(_policyDetailsURI);

    // This function fetches policy details only if they have not been fetched yet
    const fetchPolicyDetails = async () => {
      if (policyData) return; // Prevent fetching if data already exists

      const result = await GetPolicyDetails(
        _userId,
        _policyNo,
        _pin,
        _role,
        _policyDetailsURI
      );

      const policyDetails = result.policyDetails;

      const keysArr = Object.keys(policyDetails);
      
      function groupAndReplaceRelatedKeys(keys: any) {
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
        
        const flattenedGroupedKeys = groupedKeys.map(group =>
          group.length > 1 ? group : group[0],
        );

        return flattenedGroupedKeys;
      }

      const groupedKeys = groupAndReplaceRelatedKeys(keysArr);
      console.log(groupedKeys);

      const updatedTabs: any[] = [];
      
      Object.keys(componentMapping).forEach((key) => {
        
        if (policyDetails[key] && (Array.isArray(policyDetails[key]) ? policyDetails[key].length > 0 : true)) {

          const TabContent = componentMapping[key];          
          if(TabContent == DQ_Contract){
            updatedTabs.push({
              key: titleMapping[key],  // Use the titleMapping for key
              title: titleMapping[key],  // Use the titleMapping for title
              content: (
                <TabContent item={policyDetails[key]} contractAdditional={policyDetails['contractAdditional'] !== undefined ? policyDetails['contractAdditional'] : undefined }/>
              ),
            });
          }else{
            updatedTabs.push({
              key: titleMapping[key],
              title: titleMapping[key],
              content: (
                <TabContent item={policyDetails[key]} />
              ),
            });
          }
          
        }
      });

      // Update the tabs state with the valid entries
      console.log(updatedTabs);
      
      setTabs(updatedTabs);
      setPolicyData(policyDetails);
    };

    fetchPolicyDetails();
  }, [route.params]);
  
  const handleOverlayClick = () => {
    setClickedFAB((prev)=>!prev);
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
            clickedFAB = {clickedFAB}
            setClickedFAB={setClickedFAB}
          />
        )}
      </View>
      <DQ_TabView tabs={tabs} />
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay
    zIndex: 1,  // Ensure overlay is above other content
  },
});
