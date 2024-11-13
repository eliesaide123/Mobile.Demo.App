import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PolicyListService} from './service/policy-list-service';
import DQ_PolicyIcon from '../../components/DQ_PolicyIcon';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyCard from '../../components/DQ_PolicyCard';
import _shared from '../common';
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
export default function PolicyList({navigation, route}: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyList, setPolicyList] = useState<any[]>([]);
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const {groupCode: _groupCode} = route.params;
    const Get_Policy = async () => {
      const result = await PolicyListService(_shared.pin, _shared.role, _groupCode, _shared.userId);    
      const policies = result.responseData.policyList;      
      setPolicyList(policies);
      setGroupCode(_groupCode.toLowerCase());
      setPin(pin);
      setRole(role);
      setUserId(userId);
    };

    Get_Policy();
  }, []);
  return (
    <View style={styles.rootElement}>
      <DQ_BaseHeader press={()=> navigation.goBack()} variant="textCenter" textCenter={groupCode}/>
      <View style={styles.topView}>
        <View style={styles.iconView}>
          {groupCode && <DQ_PolicyIcon src={imageMapping[groupCode]} />}
        </View>
        <View style={styles.marginList}>
          {policyList && groupCode && (
            <FlatList
              data={policyList}
              renderItem={({item}) => (
                <DQ_PolicyCard
                  src={imageMapping[groupCode]}
                  item={item}
                  press={()=>{navigation.navigate('PolicyDetails',{policyNo: item.policyNo, groupCode, pin, role, userId, policyDetailsURI: item.policyDetailsURI, policyInsCoversURI: item.policyInsCoversURI, policyDataURI: item.policyDataURI})}}
                  keyExtractor={(item: any) => item.policyNo.toString()}
                />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    rootElement:{
        flex:1,
    },
  topView: {
    flex: 1,
  },
  iconView: {
    flex: 0.2,
    marginTop:25,
  },
  marginList: {
    flex: 0.6,
    marginHorizontal:10,
    marginTop:-20,
  },
});
