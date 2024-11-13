import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const DQ_Loader = ({isLoading} : any) => {
  if (!isLoading) return null;
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default DQ_Loader;
