import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
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
import DQ_InsuredRisks from '../../components/DQ_InsuredRisks';
import DQ_Dependent from '../../components/DQ_Dependent';
import DQ_FAB from '../../components/DQ_FAB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetRequestActions } from './service/get-requests-service';

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
  "insuredDep": DQ_Dependent,
  "insuredData": DQ_Insured,
  "insuredRisks" : DQ_InsuredRisks,
  "insuredCoverData": DQ_InsuredCovers,
};

const titleMapping: { [key: string]: string } = {
  "contract": "Contract",
  "vehicle": "Vehicle",
  "insuredDep": "Dependent",
  "insuredData": "Insured",
  "insuredRisks": "Insured Risks",
  "insuredCoverData": "Insured Covers",
};

export default function PolicyDetails({ navigation, route }: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setPolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>([]);
  const [policyData, setPolicyData] = useState<any>(null);
  const [policyDetailsURI, setPolicyDetailsURI] = useState<any>(null);
  const [policyInsCoversURI, setPolicyInsCoversURI] = useState<any>(null);
  const [policyDataURI, setPolicyDataURI] = useState<any>(null);
  const [clickedFAB, setClickedFAB] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [policyActions, setPolicyActions] = useState<any>(null);
  const [specialActions, setSpecialActions] = useState<any>(null);
  const [actions, setActions] = useState<any[] | null>([]);

  useEffect(() => {
  const initializePolicyDetails = async () => {
    try {
      setIsLoading(true); // Set loader to true initially

      const {
        policyNo: _policyNo,
        groupCode: grpCode,
        policyDetailsURI: _policyDetailsURI,
        policyInsCoversURI: _policyInsCoversURI,
        policyDataURI : _policyDataURI
      } = route.params;
    const getRequestsActions = async()=>{
      const result = await GetRequestActions(_shared.userId, _policyNo, _shared.pin, _shared.role );
      const _policyActions = result.policyActionsData.policyActions;
      const _specialActions = result.policyActionsData.specialActions;
      setPolicyActions(_policyActions);
      setSpecialActions(_specialActions);
      console.log(JSON.stringify(_policyActions))
      console.log(JSON.stringify(_specialActions))
    }

      const getActions = async () => {
        try {
          const acts = await AsyncStorage.getItem('contractActions');
          setActions(acts ? JSON.parse(acts) : []);
        } catch (error) {
          console.error("Failed to load actions", error);
        }
      };
      getRequestsActions()
      getActions();

    // Initialize state variables from route params
    setGroupCode(grpCode);
    setPolicyNo(_policyNo);
    setPolicyDetailsURI(_policyDetailsURI);
    setPolicyInsCoversURI(_policyInsCoversURI);

      setGroupCode(grpCode);
      setPolicyNo(_policyNo);
      setPolicyDetailsURI(_policyDetailsURI);
      setPolicyInsCoversURI(_policyInsCoversURI);
      setPolicyDataURI(_policyDataURI);

      const fetchPolicyDetails = async () => {
        if (policyData) return; // Skip fetch if data is already loaded

        const result = await GetPolicyDetails(
          _shared.userId,
          _policyNo,
          _shared.pin,
          _shared.role,
          _policyDetailsURI,
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
          
          return groupedKeys.map(group => group.length > 1 ? group : group[0]);
        }

        const groupedKeys = groupAndReplaceRelatedKeys(keysArr);
        console.log(groupedKeys);

        const updatedTabs: any[] = [];
        Object.keys(componentMapping).forEach((key) => {
          if (policyDetails[key] && (Array.isArray(policyDetails[key]) ? policyDetails[key].length > 0 : true)) {
            const TabContent = componentMapping[key];
            if (TabContent == DQ_Contract) {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent item={policyDetails[key]} contractAdditional={policyDetails['contractAdditional']} groupCode={grpCode} />
                ),
              });
            } else if (TabContent == DQ_InsuredCovers) {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent item={policyDetails[key]} coversURL={_policyInsCoversURI} policyNo={_policyNo} />
                ),
              });
            }else if (TabContent == DQ_InsuredRisks) {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent item={policyDetails[key]} coversURL={_policyInsCoversURI} policyDataURI={_policyDataURI} policyNo={_policyNo} />
                ),
              });
            } else {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: <TabContent item={policyDetails[key]} />,
              });
            }
          }
        });

        console.log(updatedTabs);
        setTabs(updatedTabs);
        setPolicyData(policyDetails);
      };

      await fetchPolicyDetails();
    } catch (error: any) {
      console.error("Error fetching policy details:", error); // Log any errors
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  initializePolicyDetails();
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
      <View style={styles.fab}>
        {actions && <DQ_FAB clicked={clickedFAB} setClicked={setClickedFAB} actions={actions}/>}
      </View>
      <View>
        {groupCode && policyNo && (
          <DQ_PolicyIconDescription
            src={imageMapping[groupCode]}
            policyNo={policyNo}
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',  // Semi-transparent overlay
    zIndex: 1,  // Ensure overlay is above other content
  },
  
  fab:{
    position:'relative',
    top:13,
    right:-290,
    zIndex:500
  }
});
