// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, Pressable } from 'react-native';
import DQ_Button from '../../components/DQ_Button';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import JSON_FILE from '../../contents/content.json';
import DQ_Link from '../../components/DQ_Link';
import DQ_EyeComponentTextBox from '../../components/DQ_EyeComponentTextBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from './Service/authService';

export default function LoginScreen({ navigation } : any) {  // Receive navigation here
  const logo = require('../../assets/images/DQ_LOGO.png');
  const HeaderContainerText = JSON_FILE.Contents.LoginScreen.HeaderContainer['en'];
  const HeaderSubContainerText = JSON_FILE.Contents.LoginScreen.HeaderContainerSubText['en'];
  const WebUserIDPlaceHolder = JSON_FILE.Contents.LoginScreen.DQ_TextBoxUserID['en'];  
  const RegisterPhrase = JSON_FILE.Contents.LoginScreen.DQ_RegisterPhrase[0]['en'];
  const RegisterNowPhrase = JSON_FILE.Contents.LoginScreen.DQ_RegisterPhrase[1]['en'];
  const DQ_ProceedAsAGuest = JSON_FILE.Contents.LoginScreen.DQ_ProceedAsAGuest['en'];

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {  // No parameters here
    console.log("Hello");
    const result = await login("r-medical", "11111111");

    if (result.success) {      
      if (result.data?.Error_Code === 90020) {
        Alert.alert('OTP Required', result.data.Error_Description || 'Please complete OTP authentication.');        
      } else if (result.data?.Status) {
        console.log('Login successful:', result.data);
        // Navigate to Register screen
        navigation.navigate('Register');
      }
    } else {
      Alert.alert('Login Failed', result.error?.Error_Description || 'An error occurred during login.');
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
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
              textAlign='right'
              fontSize={12}
              content='Forgot Password?'
              textColor='#7aabd2'
              underline={true}
              goTo='ForgotPassword'
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
          <View style={styles.inlineSubContainerItemsButton}>
            <DQ_Button title="Login" onPress={handleLogin} />
          </View>
          <Pressable style={styles.inlineSubContainerFooter} onPress={() => navigation.navigate('Register')}>
            <DQ_Paragraph fontSize={12} content={RegisterPhrase} />
            <DQ_Link
              textAlign="center"
              fontSize={12}
              content={RegisterNowPhrase}
              textColor='#7aabd2'
              underline={true}
              goTo='Register'
              
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <DQ_Link
          textAlign="center"
          content={DQ_ProceedAsAGuest}
          textColor='white'
          underline={true}
          goTo='Guest'
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
    gap: 3
  },
  inlineSubContainerItems: {
    margin: 10,
    marginBottom: 70
  },
  inlineSubContainerItemsButton: {
    flex: 0.8,
    padding: 10,
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  inlineSubContainerFooter:{
    flex: 0.3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 3,
    marginBottom: 10,
    padding: 5,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#005faf',
    marginTop: 30
  },
})
// Styles remain unchanged
