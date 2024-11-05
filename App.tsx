import React from 'react';
import {StyleSheet, View, ImageBackground, SafeAreaView} from 'react-native';
import LoginScreen from './screens/login-screen/login-screen';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,    
  },
});
