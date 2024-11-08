
import React from 'react';
import WalkThroughScreen from './screens/walkThrough-screen/walkThrough-screen';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login-screen/login-screen';
import RegistrationScreen from './screens/registration-screen/registration-screen';
import ProductPolicy from './screens/product-policy-screen/product-policy';
import ChangeRole from './screens/change-role-screen/ChangeRole';
import PolicyList from './screens/Policy-List-screen/policy-list-screen';
import AgentSearch from './screens/Agent-Search-screen/Agent-Search-screen';
import PolicyDetails from './screens/policy-details-screen/policy-details-screen';

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
          <Stack.Screen
            name="ProductPolicy"
            component={ProductPolicy}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Roles"
            component={ChangeRole}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="PolicyList"
            component={PolicyList}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="AgentSearch"
            component={AgentSearch}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}            
          />
          <Stack.Screen
            name="PolicyDetails"
            component={PolicyDetails}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
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
