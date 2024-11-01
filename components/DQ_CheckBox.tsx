import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';

const DQ_CheckBox = ({ Component, checked, onChange }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: checked ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [checked, scaleValue]);

  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCheckboxChange}>
      <Animated.View style={[styles.checkbox, { transform: [{ scale: scaleValue }] }]}>
        {checked ? (
          <Icon name="square-check" size={20} color="#0062af" iconStyle='solid'/>
        ) : (
          <Icon name="square" size={24} color="#0062af" />
        )}
      </Animated.View>
      {Component && <Component />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
  },
});

export default DQ_CheckBox;
