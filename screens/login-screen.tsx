import {View, ImageBackground, StyleSheet, Image, Text, Pressable, Linking} from 'react-native';

import DQ_Button from '../components/DQ_Button';
import DQ_TextBox from '../components/DQ_TextBox';
import DQ_Paragraph from '../components/DQ_Paragraph';
import JSON_FILE from '../contents/content.json';
import DQ_Link from '../components/DQ_Link';
import Icon from '@react-native-vector-icons/fontawesome6';
import DQ_EyeComponentTextBox from '../components/DQ_EyeComponentTextBox'

export default function LoginScreen() {
  const logo = require('../assets/images/DQ_LOGO.png');
  const HeaderContainerText =
    JSON_FILE.Contents.LoginScreen.HeaderContainer['en'];
  const HeaderSubContainerText =
    JSON_FILE.Contents.LoginScreen.HeaderContainerSubText['en'];
  const WebUserIDPlaceHolder =
    JSON_FILE.Contents.LoginScreen.DQ_TextBoxUserID['en'];
  const PasswordPlaceHolder =
    JSON_FILE.Contents.LoginScreen.DQ_TextBoxPassword['en'];
  const RegisterPhrase = JSON_FILE.Contents.LoginScreen.DQ_RegisterPhrase[0]['en'];
  const RegisterNowPhrase = JSON_FILE.Contents.LoginScreen.DQ_RegisterPhrase[1]['en'];
  const DQ_ProceedAsAGuest = JSON_FILE.Contents.LoginScreen.DQ_ProceedAsAGuest['en']
   
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerText}>
        <Image source={logo}></Image>
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.inlineSubContainer}>
            <DQ_Paragraph
              content={HeaderContainerText}
              fontSize={18}
              textColor="#555"
              textAlign="center"
            />
            <DQ_Paragraph
              content={HeaderSubContainerText}
              fontSize={18}
              textColor="grey"
              textAlign="center"
            />
          </View>          
          <View style={styles.inlineSubContainerItems}>
            <DQ_TextBox placeholder={WebUserIDPlaceHolder} borderColor="grey"/>
            <DQ_EyeComponentTextBox />                              
            <DQ_Link textAlign='right' fontSize={12} content='Forgot Password?' textColor='#7aabd2' underline={true} goTo=''/>            
          </View>
          <View style={styles.inlineSubContainerItemsButton}>
            <DQ_Button title="Login" />
          </View>
          <View style={styles.inlineSubContainerFooter}>
            <DQ_Paragraph fontSize={12} content={RegisterPhrase}/>
            <DQ_Link textAlign="center" fontSize={12} content={RegisterNowPhrase} textColor='#7aabd2' underline={true} goTo=''/>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <DQ_Link textAlign="center" content={DQ_ProceedAsAGuest} textColor='white' underline={true} goTo='' fontSize={18} uppercased={true}/>
      </View>
    </View>    
  );
}

const styles = StyleSheet.create({
  headerText: {
    flex: 0.2,    
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,    
    backgroundColor: '#005faf',
  },
  container: {
    flex: 0.6,       
    margin: 5,
  },
  subContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,    
  },
  inlineSubContainer: {
    alignItems: 'center',
    padding: 10,
    gap: 3
  },
  inlineSubContainerItems: {    
    margin: 10,    
  },
  inlineSubContainerItemsButton: {
    flex: 0.8,
    padding: 10,
    justifyContent: 'flex-end'
  },
  inlineSubContainerFooter:{
    flex: 0.3, 
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',    
    gap: 3
  },
  footer: {
    flex: 0.2,
    justifyContent:'center',
    alignItems:'center'
  },
});
