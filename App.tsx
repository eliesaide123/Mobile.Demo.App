
import React from 'react';
import WalkThroughScreen from './screens/walkThrough-screen/walkThrough-screen';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login-screen/login-screen';
import RegistrationScreen from './screens/registration-screen/registration-screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="rgb(0, 95, 175)" />
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="WalkThrough"
            component={WalkThroughScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
