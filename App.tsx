import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import RegistrationScreen from './screens/registration-screen';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <RegistrationScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,    
  },
});
