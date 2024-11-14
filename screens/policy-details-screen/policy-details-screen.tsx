import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyIconDescription from '../../components/DQ_PolicyIconDescription';
import DQ_TabView from '../../components/DQ_TabView';
import {GetPolicyDetails} from './service/get-policy-details-service';
import DQ_Contract from '../../components/DQ_Contract';
import DQ_Vehicle from '../../components/DQ_Vehicle';
import DQ_Insured from '../../components/DQ_Insured';
import DQ_InsuredCovers from '../../components/DQ_InsuredCovers';
import _shared from '../common';
import DQ_Loader from '../../components/DQ_Loader';
import DQ_InsuredRisks from '../../components/DQ_InsuredRisks';
import DQ_Dependent from '../../components/DQ_Dependent';
import DQ_FAB from '../../components/DQ_FAB';
import {GetRequestActions} from './service/get-requests-service';

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
  insuredDep: DQ_Dependent,
  insuredData: DQ_Insured,
  insuredRisks: DQ_InsuredRisks,
  insuredCoverData: DQ_InsuredCovers,
};

const titleMapping: {[key: string]: string} = {
  contract: 'Contract',
  vehicle: 'Vehicle',
  insuredDep: 'Dependent',
  insuredData: 'Insured',
  insuredRisks: 'Insured Risks',
  insuredCoverData: 'Insured Covers',
};

export default function PolicyDetails({navigation, route}: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setPolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>([]);
  const [policyData, setPolicyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clickedFAB, setClickedFAB] = useState<boolean>(false);
  const [policyActions, setPolicyActions] = useState<any>(null);
  const [specialActions, setSpecialActions] = useState<any>(null);

  const [actions, setActions] = useState<any>({
    predefinedActions: [],
    policyActions: [],
    specialActions: [],
  });

  const initializePolicyDetails = async () => {
    try {
      setIsLoading(true);

      const {
        policyNo: _policyNo,
        groupCode: grpCode,
        policyDetailsURI: _policyDetailsURI,
        policyInsCoversURI: _policyInsCoversURI,
        policyDataURI: _policyDataURI,
      } = route.params;

      setGroupCode(grpCode);
      setPolicyNo(_policyNo);

      const result = await GetPolicyDetails(
        _shared.userId,
        _policyNo,
        _shared.pin,
        _shared.role,
        _policyDetailsURI,
      );

      const policyDetails = result.policyDetails;
      await getRequestsActions(_policyNo);
      await getActions(policyDetails.contract);

<<<<<<< HEAD
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
=======
      const updatedTabs = Object.keys(componentMapping).reduce((acc, key) => {
        if (policyDetails[key]) {
          const TabContent = componentMapping[key];
          acc.push({
            key: titleMapping[key],
            title: titleMapping[key],
            content: <TabContent item={policyDetails[key]} />,
          });
        }
        return acc;
      }, []);
>>>>>>> 74476e6098cfbd85b52cc1b5fcbe2a3462ce72e1

      setTabs(updatedTabs);
      setPolicyData(policyDetails);
    } catch (error) {
      console.error('Error fetching policy details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRequestsActions = async (policyNo: string) => {
    const result = await GetRequestActions(
      _shared.userId,
      policyNo,
      _shared.pin,
      _shared.role,
    );
    setPolicyActions(result.policyActionsData.policyActions);
    setSpecialActions(result.policyActionsData.specialActions);
<<<<<<< HEAD
    setActions((prev: any) => ({
      ...prev,
      policyActions: result.policyActionsData.policyActions?.map((item: any) => ({
        ...item,
        iconName: 'clipboard-list',
      })),
      specialActions: result.policyActionsData.specialActions?.map((item: any) => ({
=======
    setActions(prev => ({
      ...prev,
      policyActions: result.policyActionsData.policyActions.map((item: any) => ({
        ...item,
        iconName: 'clipboard-list',
      })),
      specialActions: result.policyActionsData.specialActions.map((item: any) => ({
>>>>>>> 74476e6098cfbd85b52cc1b5fcbe2a3462ce72e1
        ...item,
        iconName: item.actionCode === 'MOBILE' ? 'mobile-screen-button' : 'envelope',
      })),
    }));
  };

  const getActions = (contractData: any) => {
    const predefinedActions = [
      {
        attr: 'canPrintPolicy',
        value: String(contractData[0].canPrintPolicy || ''),
        title: 'Print Policy',
        iconName: 'person-circle-plus',
        actionCode:"RqPrintPolicy",
        url:"/request/print"
      },
      {
        attr: 'hasBeneficiary',
        value: String(contractData[0].hasBeneficiary || ''),
        title: 'Beneficiary',
        iconName: 'person-circle-plus',
        url:"/policy/beneficiary"
      },
      {
        attr: 'hasLegalAddress',
        value: String(contractData[0].hasLegalAddress || ''),
        title: 'Legal Address',
        iconName: 'location-dot',
        url:"/policy/address"
      },
      {
        attr: 'hasClaims',
        value: String(contractData[0].hasClaims || ''),
        title: 'Policy Claims',
        iconName: 'file-pen',
      },
      {
        attr: 'hasDuePremiums',
        value: String(contractData[0].hasDuePremiums || ''),
        title: 'Due Premiums',
        iconName: 'business-time',
      },
      {
        attr: 'hasPendingRequests',
        value: String(contractData[0].hasPendingRequests || ''),
        title: 'My Requests',
        iconName: 'clipboard-list',
      },
      {
        attr: 'canPrintAlpSoa',
        value: String(contractData[0].canPrintAlpSoa || ''),
        title: 'Print SOA',
        iconName: 'person-circle-plus',
        actionCode:"RqPrintPolicy",
        url:"/request/print"
      },
      {
        attr: 'canRenewPolicy',
        value: String(contractData[0].canRenewPolicy || ''),
        title: 'Renew',
        iconName: 'clipboard-list',
      },
    ];
<<<<<<< HEAD
    setActions((prev : any) => ({
=======
    setActions(prev => ({
>>>>>>> 74476e6098cfbd85b52cc1b5fcbe2a3462ce72e1
      ...prev,
      predefinedActions,
    }));
  };

  useEffect(() => {
    initializePolicyDetails();
  }, [route.params]);

  const handleOverlayClick = () => setClickedFAB(prev => !prev);

  return (
    <SafeAreaView style={styles.rootElement}>
      <DQ_BaseHeader
        variant="textCenter"
        textCenter={groupCode}
        press={() => navigation.goBack()}
      />
      {clickedFAB && (
        <View style={styles.overlay} onTouchStart={handleOverlayClick} />
<<<<<<< HEAD
      )}      
=======
      )}
>>>>>>> 74476e6098cfbd85b52cc1b5fcbe2a3462ce72e1
      <View style={styles.fab}>
        {actions.predefinedActions.length > 0 && (
          <DQ_FAB
            clicked={clickedFAB}
            setClicked={setClickedFAB}
            actions={actions}
          />
        )}
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
  rootElement: {flex: 1, backgroundColor: '#ebebeb'},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  },
  fab: {position: 'relative', top: 13, right: -290, zIndex: 500},
});
