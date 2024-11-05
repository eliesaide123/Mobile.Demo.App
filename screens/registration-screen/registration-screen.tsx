/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import DQ_Button from '../../components/DQ_Button';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import JSON_FILE from '../../contents/content.json';
import DQ_Link from '../../components/DQ_Link';
import DQ_EyeComponentTextBox from '../../components/DQ_EyeComponentTextBox';
import {useState} from 'react';
import DQ_CheckBox from '../../components/DQ_CheckBox';
import Icon from '@react-native-vector-icons/fontawesome6';

export default function RegistrationScreen({navigation, route}: any) {
  const logo = require('../../assets/images/DQ_LOGO.png');
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
  const IAgreePhrase =
    JSON_FILE.Contents.RegistrationScreen.DQ_IAgreePhrase[0]['en'];
  const TermsAndConditionsPhrase =
    JSON_FILE.Contents.RegistrationScreen.DQ_IAgreePhrase[1]['en'];
  const RegisterText =
    JSON_FILE.Contents.RegistrationScreen.DQ_ButtonRegister['en'];

  const [policyNumber, setPolicyNumber] = useState('');
  const [policyExpiry, setPolicyExpiry] = useState('');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [webUserID, setWebUserID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const regularFont = 'Nexa Regular';
  const lightFont = 'Nexa Regular';
  const boldFont = 'Nexa Bold';

  const checkBoxLabel = () => (
    <View style={styles.checkBoxLabel}>
      <DQ_Paragraph
        content={IAgreePhrase}
        fontSize={12}
        textColor="black"
        textAlign="center"
      />
      <DQ_Link
        textAlign="center"
        fontSize={12}
        content={TermsAndConditionsPhrase}
        textColor="#68a2cf"
        underline={true}
        goTo=""
      />
    </View>
  );

  async function sendRequest() {}
  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-left"
          size={18}
          color="white"
          style={styles.icon}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <View style={styles.headerText}>
        <Image source={logo}></Image>
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.inlineSubContainer}>
            <DQ_Paragraph
              content={HeaderContainerText}
              fontSize={18}
              fontFamily={regularFont}
              textColor="#555"
              textAlign="center"
              uppercased={true}
            />
            <DQ_Paragraph
              content={HeaderSubContainerText}
              fontSize={18}
              fontFamily={lightFont}
              textColor="#ced1d4"
              textAlign="center"
            />
          </View>
          <View style={styles.inlineSubContainerItems}>
            <DQ_TextBox
              placeholder={PolicyNumberPlaceHolder}
              hintText={PolicyNumberHintText}
              borderColor="grey"
              value={policyNumber}
              onChangeText={setPolicyNumber}
              fontFamily={lightFont}
            />
            <DQ_TextBox
              placeholder={PolicyExpiryPlaceHolder}
              borderColor="grey"
              value={policyExpiry}
              onChangeText={setPolicyExpiry}
              fontFamily={lightFont}
            />
            <DQ_TextBox
              placeholder={YourPINPlaceHolder}
              hintText={YourPINHintText}
              borderColor="grey"
              value={pin}
              onChangeText={setPin}
              fontFamily={lightFont}
            />
            <DQ_TextBox
              placeholder={EmailPlaceHolder}
              borderColor="grey"
              value={email}
              setEmail={setEmail}
              fontFamily={lightFont}
            />
            <DQ_TextBox
              placeholder={MobileNumberPlaceHolder}
              hintText={MobileNumberHintText}
              borderColor="grey"
              value={mobileNumber}
              keyboardType="phone-pad"
              onChangeText={setMobileNumber}
              fontFamily={lightFont}
            />
            <DQ_TextBox
              placeholder={WebUserIDPlaceHolder}
              hintText={WebUserIDHintText}
              borderColor="grey"
              value={webUserID}
              onChangeText={setWebUserID}
              fontFamily={lightFont}
            />
            <DQ_EyeComponentTextBox
              placeholder={PasswordPlaceHolder}
              borderColor="grey"
              value={password}
              onChangeText={setPassword}
              fontFamily={lightFont}
            />
            <DQ_EyeComponentTextBox
              placeholder={ConfirmPasswordPlaceHolder}
              borderColor="grey"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              fontFamily={lightFont}
            />
          </View>
          <View style={styles.inlineSubContainerItemsButton}>
            <DQ_CheckBox
              Component={checkBoxLabel}
              checked={isChecked}
              onChange={setIsChecked}
              checkBoxColor="#0062af"
            />
            <DQ_Button
              title={RegisterText}
              fontFamily={boldFont}
              onPress={sendRequest}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <DQ_Paragraph
          fontSize={12}
          content={LoginPhrase}
          textColor="white"
          fontFamily={lightFont}
        />
        <DQ_Link
          textAlign="center"
          fontSize={12}
          content={LoginHerePhrase}
          textColor="white"
          underline={true}
          fontFamily={lightFont}
          goTo=""
        />
        <DQ_Paragraph
          fontSize={12}
          content={policyNumber}
          textColor="white"
          fontFamily={lightFont}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    flex: 1,
    marginTop: 30,
    padding: 10,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',        
  },
  backTxt: {},
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
    marginBottom: 15,
  },
  checkBoxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  icon: {
    padding: 5,
  },
});
