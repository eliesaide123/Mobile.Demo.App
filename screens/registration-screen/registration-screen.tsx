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
import DQ_Link from '../../components/DQ_Link';
import DQ_EyeComponentTextBox from '../../components/DQ_EyeComponentTextBox';
import DQ_CheckBox from '../../components/DQ_CheckBox';
import Icon from '@react-native-vector-icons/fontawesome6';
import { getLocalizedEntry } from '../../Shared/SharedFunctions'; 

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function RegistrationScreen({ navigation }: any) {
  const logo = require('../../assets/images/DQ_LOGO.png');

  // Using getLocalizedEntry for all localized text
  const HeaderContainerText = getLocalizedEntry('RegistrationScreen', 'HeaderContainer');
  const HeaderSubContainerText = getLocalizedEntry('RegistrationScreen', 'HeaderContainerSubText');
  const PolicyNumberPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxPolicyNumber');
  const PolicyNumberHintText = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxPolicyNumberHintText');
  const PolicyExpiryPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxPolicyExpiry');
  const YourPINPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxYourPin');
  const YourPINHintText = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxYourPinHintText');
  const EmailPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxEmail');
  const MobileNumberPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxMobileNumber');
  const MobileNumberHintText = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxMobileNumberHintText');
  const WebUserIDPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxUserID');
  const WebUserIDHintText = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxUserIDHintText');
  const PasswordPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxPassword');
  const ConfirmPasswordPlaceHolder = getLocalizedEntry('RegistrationScreen', 'DQ_TextBoxConfirmPassword');
  const LoginPhrase = getLocalizedEntry('RegistrationScreen', 'DQ_LoginPhrase') as string[] | null;
  const LoginHerePhrase = LoginPhrase ? LoginPhrase[1] : ''; // Access the second element if it exists
  const IAgreePhrase = getLocalizedEntry('RegistrationScreen', 'DQ_IAgreePhrase') as string[] | null;
  const IAgreeText = IAgreePhrase ? IAgreePhrase[0] : ''; // Access the first element if it exists
  const TermsAndConditionsPhrase = IAgreePhrase ? IAgreePhrase[1] : ''; // Access the second element if it exists

  const RegisterText = getLocalizedEntry('RegistrationScreen', 'DQ_ButtonRegister');

  const regularFont = 'Nexa Regular';
  const lightFont = 'Nexa Regular';
  const boldFont = 'Nexa Bold';

  const validationSchema = yup.object().shape({
    policyNumber: yup.string().required('Policy number is required'),
    policyExpiry: yup.string().required('Expiry date is required'),
    pin: yup.string().min(4, 'PIN must be at least 4 characters').required('PIN is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    mobileNumber: yup.string().min(10, 'Enter a valid mobile number').required('Mobile number is required'),
    webUserID: yup.string().required('User ID is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
    isChecked: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      policyNumber: '',
      policyExpiry: '',
      pin: '',
      email: '',
      mobileNumber: '',
      webUserID: '',
      password: '',
      confirmPassword: '',
      isChecked: false,
    },
  });

  const checkBoxLabel = () => (
    <View style={styles.checkBoxLabel}>
      <DQ_Paragraph
        content={IAgreeText}
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

  const onSubmit = (data: any) => {
    console.log(data);
    // Perform registration logic here
  };

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
        <Image source={logo} />
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
            <Controller
              control={control}
              name="policyNumber"
              render={({ field: { onChange, value } }) => (
                <DQ_TextBox
                  placeholder={PolicyNumberPlaceHolder}
                  hintText={PolicyNumberHintText}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.policyNumber && <Text style={{ color: 'red' }}>{errors.policyNumber.message}</Text>}
            <Controller
              control={control}
              name="policyExpiry"
              render={({ field: { onChange, value } }) => (
                <DQ_TextBox
                  placeholder={PolicyExpiryPlaceHolder}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.policyExpiry && <Text style={{ color: 'red' }}>{errors.policyExpiry.message}</Text>}
            <Controller
              control={control}
              name="pin"
              render={({ field: { onChange, value } }) => (
                <DQ_TextBox
                  placeholder={YourPINPlaceHolder}
                  hintText={YourPINHintText}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.pin && <Text style={{ color: 'red' }}>{errors.pin.message}</Text>}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <DQ_TextBox
                  placeholder={EmailPlaceHolder}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { onChange, value } }) => (
                <DQ_TextBox
                  placeholder={MobileNumberPlaceHolder}
                  hintText={MobileNumberHintText}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.mobileNumber && <Text style={{ color: 'red' }}>{errors.mobileNumber.message}</Text>}
            <Controller
              control={control}
              name="webUserID"
              render={({ field: { onChange, value } }) => (
                <DQ_TextBox
                  placeholder={WebUserIDPlaceHolder}
                  hintText={WebUserIDHintText}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.webUserID && <Text style={{ color: 'red' }}>{errors.webUserID.message}</Text>}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <DQ_EyeComponentTextBox
                  placeholder={PasswordPlaceHolder}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <DQ_EyeComponentTextBox
                  placeholder={ConfirmPasswordPlaceHolder}
                  borderColor="grey"
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                />
              )}
            />
            {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}
          </View>
          <View style={styles.inlineSubContainerItemsButton}>
            <Controller
              control={control}
              name="isChecked"
              render={({ field: { onChange, value } }) => (
                <DQ_CheckBox
                  Component={checkBoxLabel}
                  checked={value}
                  onChange={onChange}
                  checkBoxColor="#0062af"
                />
              )}
            />
            {errors.isChecked && <Text style={{ color: 'red' }}>{errors.isChecked.message}</Text>}
            <DQ_Button
              title={RegisterText}
              fontFamily={boldFont}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <DQ_Paragraph
          fontSize={12}
          content={LoginPhrase ? LoginPhrase[0] : ''} // First part of LoginPhrase
          textColor="white"
          fontFamily={lightFont}
        />
        <DQ_Link
          textAlign="center"
          fontSize={12}
          content={LoginHerePhrase} // Second part of LoginPhrase
          textColor="white"
          underline={true}
          fontFamily={lightFont}
          goTo=""
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 30,
    padding: 10,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
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
