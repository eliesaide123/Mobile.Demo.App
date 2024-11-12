import React, { useEffect, useState } from 'react';
import WalkThroughScreen from './screens/walkThrough-screen/walkThrough-screen';
import { StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login-screen/login-screen';
import RegistrationScreen from './screens/registration-screen/registration-screen';
import ProductPolicy from './screens/product-policy-screen/product-policy';
import ChangeRole from './screens/change-role-screen/ChangeRole';
import PolicyList from './screens/Policy-List-screen/policy-list-screen';
import AgentSearch from './screens/Agent-Search-screen/Agent-Search-screen';
import PolicyDetails from './screens/policy-details-screen/policy-details-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    // Check AsyncStorage for the key that determines if walkthrough is completed
    const checkWalkthroughStatus = async () => {
      try {
        const walkthroughStatus = await AsyncStorage.getItem('walkthroughCompleted');
        console.log(walkthroughStatus)
        if (walkthroughStatus === 'true') {
          setIsWalkthroughComplete(true);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage', error);
      } finally {
        setLoading(false);  // Set loading to false once the check is done
      }
    };

    checkWalkthroughStatus();
  }, []);

  // If loading, display a loading indicator until AsyncStorage check is complete
  if (loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar translucent backgroundColor="rgb(0, 95, 175)" />
        <ActivityIndicator size="large" color="#f4511e" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="rgb(0, 95, 175)" />
      <NavigationContainer>
        <Stack.Navigator>
          {!isWalkthroughComplete && (
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
          )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
