import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { ProductPolicyService } from '../product-policy-screen/service/product-policy.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import JSON_FILE from '../../contents/content.json';
import Icon from '@react-native-vector-icons/fontawesome6';

export default function ChangeRole({navigation}:any) {

    const [roles, setRoles] = useState([])

  useEffect(() => {
    Get_CS_Connect()
  }, []);

  const RoleTxt =
    JSON_FILE.Contents.ChangeRole.RoleTxt['en'];

  const imageMapping: {[key: string]: any} = {
    'policy holder.png': require('../../assets/images/policyholder.png'),
    'insured.png': require('../../assets/images/insured.png'), 
    'agent.png': require('../../assets/images/agent.png')    
  };

  const Get_CS_Connect = async () => {
    const result = await ProductPolicyService()
    
    var roles = result.resposneData.userData[0].roles
    setRoles(roles);
  }

  const logo = require('../../assets/images/DataQuest_Logo.png');
  const Item = ({name}: {name: string}) => {
    const imageName = `${name.toLowerCase()}.png`;
  
    return (
      <View style={styles.Image_Container}>
        <View style={styles.Inline_Image}>
          <Image
            source={imageMapping[imageName]}
            style={styles.Rounded_Image}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.Product_Name}>{name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootElement}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="chevron-left" size={16} color='#056fb5' iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <View>
        <Image source={logo} resizeMode="contain" style={styles.logo}/>
      </View>
      <View style={styles.header} >
        <DQ_Paragraph content={RoleTxt} textAlign="center" uppercased/>
      </View>
      <View>
        {roles?.length > 0 && (
          <FlatList
            data={roles}
            renderItem={({item}: any) => <Item name={item.roleName} />}
            keyExtractor={(item: any) => item?.roleName.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
  },
  backButton:{
    marginTop:20,
    marginHorizontal:15,
  },
  header:{
    width:300,
    alignSelf:'center'
  },
  Image_Container: {
    padding: 10,
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Product_Name: {
    textAlign: 'center',
    width: 100,
    flexWrap: 'wrap',
    color: '#005faf',
    fontWeight: '700',
  },
  Rounded_Image: {
    width: 65,
    height: 65,
    margin: 8,
  },
  Inline_Image: {
    backgroundColor:'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 9,
    margin: 10,
    padding: 15,
    borderRadius: 60,
  },
  logo:{
    width:180,
    height:120,
    alignSelf:'center',
  }
});
