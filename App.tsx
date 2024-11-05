// App.tsx
import React from 'react';
<<<<<<< HEAD
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login-screen/login-screen';


const Stack = createNativeStackNavigator();
=======
import {StyleSheet, SafeAreaView} from 'react-native';
import RegistrationScreen from './screens/registration-screen';
>>>>>>> origin/registrationScreen

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={} />
        </Stack.Navigator>
      </NavigationContainer>
=======
      <RegistrationScreen />
>>>>>>> origin/registrationScreen
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
