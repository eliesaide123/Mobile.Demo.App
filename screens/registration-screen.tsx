import {View, StyleSheet, Image, ScrollView} from 'react-native';

import DQ_Button from '../components/DQ_Button';
import DQ_TextBox from '../components/DQ_TextBox';
import DQ_Paragraph from '../components/DQ_Paragraph';
import JSON_FILE from '../contents/content.json';
import DQ_Link from '../components/DQ_Link';
import DQ_EyeComponentTextBox from '../components/DQ_EyeComponentTextBox';

export default function RegistrationScreen() {
  const logo = require('../assets/images/DQ_LOGO.png');
  const HeaderContainerText =
    JSON_FILE.Contents.RegistrationScreen.HeaderContainer['en'];
  const HeaderSubContainerText =
    JSON_FILE.Contents.RegistrationScreen.HeaderContainerSubText['en'];
  const PolicyNumberPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxPolicyNumber['en'];
  const PolicyNumberHintText =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxPolicyNumberHintText['en'];
  const PolicyExpiryPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxPolicyExpiry['en'];
  const YourPINPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxYourPin['en'];
  const YourPINHintText =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxYourPinHintText['en'];
  const EmailPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxEmail['en'];
  const MobileNumberPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxMobileNumber['en'];
    const MobileNumberHintText =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxMobileNumberHintText['en'];
  const WebUserIDPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxUserID['en'];
    const WebUserIDHintText =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxUserIDHintText['en'];
  const PasswordPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxPassword['en'];
  const ConfirmPasswordPlaceHolder =
    JSON_FILE.Contents.RegistrationScreen.DQ_TextBoxConfirmPassword['en'];
    const LoginPhrase =
    JSON_FILE.Contents.RegistrationScreen.DQ_LoginPhrase[0]['en'];
  const LoginHerePhrase =
    JSON_FILE.Contents.RegistrationScreen.DQ_LoginPhrase[1]['en'];
  const RegisterText =
    JSON_FILE.Contents.RegistrationScreen.DQ_ButtonRegister['en'];
  return (
    <ScrollView style={styles.mainContainer}>
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
              uppercased ={true}
            />
            <DQ_Paragraph
              content={HeaderSubContainerText}
              fontSize={18}
              textColor="#ced1d4"
              textAlign="center"
            />
          </View>
          <View style={styles.inlineSubContainerItems}>
            <DQ_TextBox placeholder={PolicyNumberPlaceHolder} hintText={PolicyNumberHintText} borderColor="grey" />
            <DQ_TextBox placeholder={PolicyExpiryPlaceHolder} borderColor="grey" />
            <DQ_TextBox placeholder={YourPINPlaceHolder} hintText={YourPINHintText} borderColor="grey" />
            <DQ_TextBox placeholder={EmailPlaceHolder} borderColor="grey" />
            <DQ_TextBox placeholder={MobileNumberPlaceHolder} hintText={MobileNumberHintText} borderColor="grey" />
            <DQ_TextBox placeholder={WebUserIDPlaceHolder} hintText={WebUserIDHintText} borderColor="grey" />
            <DQ_EyeComponentTextBox
              placeholder={PasswordPlaceHolder}
              borderColor="grey"
            />
            <DQ_EyeComponentTextBox
              placeholder={ConfirmPasswordPlaceHolder}
              borderColor="grey"
            />
          </View>
          <View style={styles.inlineSubContainerItemsButton}>
            {/*TODO: create checkbox component*/}
            <DQ_Button title={RegisterText} />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
      <DQ_Paragraph fontSize={12} content={LoginPhrase} textColor='white' />
            <DQ_Link
              textAlign="center"
              fontSize={12}
              content={LoginHerePhrase}
              textColor="white"
              underline={true}
              goTo=""
            />
      </View>
    </ScrollView>
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
    gap: 3,
  },
  inlineSubContainerItems: {
    margin: 10,
  },
  inlineSubContainerItemsButton: {
    flex: 0.8,
    padding: 10,
    justifyContent: 'flex-end',
  },
  inlineSubContainerFooter: {
    flex: 0.3,
  },
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginBottom:15
  },
});
