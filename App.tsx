import React from 'react';
import {StyleSheet , SafeAreaView} from 'react-native';
//import LoginScreen from './screens/login-screen';
import WalkThroughScreen from './screens/walkThrough-screen';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <LoginScreen /> */}
      <WalkThroughScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
