// App.tsx
import React from 'react';
<<<<<<< HEAD
import {StyleSheet , SafeAreaView} from 'react-native';
//import LoginScreen from './screens/login-screen';
import WalkThroughScreen from './screens/walkThrough-screen';
=======
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login-screen/login-screen';
import RegistrationScreen from './screens/registration-screen/registration-screen';

const Stack = createNativeStackNavigator();
>>>>>>> 118e12ee0eec5025021a107535266c14b8a46a1d

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
<<<<<<< HEAD
      {/* <LoginScreen /> */}
      <WalkThroughScreen />
=======
      <StatusBar translucent backgroundColor="rgb(0, 95, 175)" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{              
              headerShown: false,              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
>>>>>>> 118e12ee0eec5025021a107535266c14b8a46a1d
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
