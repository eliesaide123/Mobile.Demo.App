import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DQ_Button from './DQ_Button';

const logo = require('../assets/images/DQ_LOGO.png');
const changeRoleLogo = require('../assets/images/mutlirole.png');

export default function DQ_BaseHeader({navigation, press}: any) {
  return (
    <View style={styles.header}>
      <View style={styles.commands}>
        <View>
          <TouchableOpacity style={styles.backButton} onPress={press}>
            <Icon
              name="chevron-left"
              size={18}
              color="#FFFFFF"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Roles')}>
            <Image source={changeRoleLogo} style={styles.changeRoleIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#005faf',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderStartEndRadius: 20,
    borderEndEndRadius: 20,
    borderWidth:2,
    gap:5,
  },
  commands:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    gap:5
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logoContainer:{
    alignSelf: 'center',
    alignContent:'center',
    justifyContent: 'center',
  },
  logo: {
    height: 50,

    marginTop: 20,
  },
  changeRoleIcon:{
    width:35,
    height:35,
    marginTop:25
  }
});
