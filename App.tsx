/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

function App(): React.JSX.Element {


  return (
    <SafeAreaView style={[styles.rootScreen]}>
      <View>
        <Icon name='user' size={22} color="red"/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
  },
});

export default App;
