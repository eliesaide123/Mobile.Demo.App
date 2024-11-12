import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const DQ_FAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = new Animated.Value(0);

  const toggleOpen = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const item1Style = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60], // Adjust as needed
        }),
      },
    ],
  };

  const item2Style = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120], // Adjust as needed
        }),
      },
    ],
  };

  const item3Style = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -180], // Adjust as needed
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* FAB Items */}
      <Animated.View style={[styles.fabItem, item1Style]}>
        <TouchableOpacity style={styles.fabButton}>
          <Icon name="list" size={18} color="white" iconStyle='solid' />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.fabItem, item2Style]}>
        <TouchableOpacity style={styles.fabButton}>
          <Icon name="list" size={18} color="white" iconStyle='solid' />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.fabItem, item3Style]}>
        <TouchableOpacity style={styles.fabButton}>
        <Icon name="list" size={18} color="white" iconStyle='solid' />
        </TouchableOpacity>
      </Animated.View>

      {/* Main FAB Button */}
      <TouchableOpacity style={styles.fab} onPress={toggleOpen}>
        <Animated.View style={{ transform: [{ rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }) }]}}>
          <Icon name="list" size={18} color="white" iconStyle='solid' />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  fab: {
    width: 36,
    height: 36,
    borderRadius: 28,
    backgroundColor: '#FFA000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabButton: {
    width: 18,
    height: 18,
    borderRadius: 24,
    backgroundColor: '#0160ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.9,
  },
});

export default DQ_FAB;
