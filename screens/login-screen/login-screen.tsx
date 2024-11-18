import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Text,
} from 'react-native';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import DQ_Link from '../../components/DQ_Link';
import DQ_EyeComponentTextBox from '../../components/DQ_EyeComponentTextBox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {login} from './Service/authService';
import _shared from '../common';
import {getLocalizedEntry} from '../../Shared/SharedFunctions';
import DQ_Alert from '../../components/DQ_Alert';
import {ProductPolicyService} from '../product-policy-screen/service/product-policy.service';
import {useAlert} from '../../hooks/useAlert';
import DQ_LoaderBtn from '../../components/DQ_LoaderBtn';
import {LoginCredentials} from '../../Shared/Types';
import SharedService from '../../Shared/SharedService';

export default function LoginScreen({navigation}: any) {
  const logo = require('../../assets/images/DQ_LOGO.png');
  const HeaderContainerText = getLocalizedEntry(
    'LoginScreen',
    'HeaderContainer',
  );
  const HeaderSubContainerText = getLocalizedEntry(
    'LoginScreen',
    'HeaderContainerSubText',
  );
  const WebUserIDPlaceHolder = getLocalizedEntry(
    'LoginScreen',
    'DQ_TextBoxUserID',
  );
  const RegisterPhrase = getLocalizedEntry(
    'LoginScreen',
    'DQ_RegisterPhrase',
  ) as string[] | null;
  const RegisterNowPhrase = RegisterPhrase ? RegisterPhrase[1] : '';
  const DQ_ProceedAsAGuest = getLocalizedEntry(
    'LoginScreen',
    'DQ_ProceedAsAGuest',
  );

  const {isVisible, showAlert, hideAlert, errorMessage} = useAlert();

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let credentials: LoginCredentials;

  // Set alert handler in useEffect
  useEffect(() => {
    SharedService.setAlertHandler(showAlert);
  }, [showAlert]);

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Show loader
      credentials = {
        mA_UserID: userId,
        cS_UserID: userId,
        cS_Password: password,
      };
      const result = await login(credentials);

      _shared.ui_token = result?.response.imS_UIToken || '';
      _shared.userId = userId;
      const checkRoleResult = await ProductPolicyService(userId);
      if (
        checkRoleResult.user_Role &&
        checkRoleResult.user_Role.toUpperCase() === 'A'
      ) {
        navigation.navigate('AgentSearch');
      } else if (checkRoleResult.user_Role) {
        navigation.navigate('ProductPolicy');
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <DQ_Alert
        isVisible={isVisible}
        hideAlert={hideAlert}
        btnList={[
          {
            title: 'Ok',
            press: () => {
              hideAlert();
            },
          },
        ]}>
        <DQ_Paragraph
          content={errorMessage}
          textColor="black"
          textAlign="center"
          fontSize={14}
        />
      </DQ_Alert>

      <View style={styles.headerText}>
        <Image source={logo} />
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
            <DQ_TextBox
              placeholder={WebUserIDPlaceHolder}
              borderColor="grey"
              value={userId}
              onChangeText={setUserId}
            />
            <DQ_EyeComponentTextBox
              placeholder="Enter Password"
              borderColor="grey"
              value={password}
              onChangeText={setPassword}
            />
            <DQ_Link
              textAlign="right"
              fontSize={12}
              content="Forgot Password?"
              textColor="#7aabd2"
              underline={true}
              goTo="ForgotPassword"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>

          <View style={styles.inlineSubContainerItemsButton}>
            <DQ_LoaderBtn
              title="Login"
              onPress={handleLogin}
              loading={isLoading}
            />
          </View>

          <Pressable
            style={styles.inlineSubContainerFooter}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{fontSize: 12}}>
              {RegisterPhrase ? RegisterPhrase[0] : ''}
            </Text>
            <DQ_Link
              textAlign="center"
              fontSize={12}
              content={RegisterNowPhrase}
              textColor="#7aabd2"
              underline={true}
              goTo="Register"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <DQ_Link
          textAlign="center"
          content={DQ_ProceedAsAGuest}
          textColor="white"
          underline={true}
          goTo="Guest"
          fontSize={18}
          uppercased={true}
          onPress={() => navigation.navigate('Guest')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#005faf',
  },
  headerText: {
    flex: 0.2,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 70,
  },
  inlineSubContainerItemsButton: {
    flex: 0.8,
    padding: 10,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  inlineSubContainerFooter: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginBottom: 10,
    padding: 10,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#005faf',
    marginTop: 30,
  },
});
