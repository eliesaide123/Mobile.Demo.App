import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import Icon from '@react-native-vector-icons/fontawesome6';
import DQ_Paragraph from './DQ_Paragraph';

export default function DQ_FAB({ clicked, setClicked }) {
  const items = ['list', 'xmark', 'list', 'list', 'list', 'list'];

  const itemPositions = items.map(() => useSharedValue(0));
  const itemOpacities = items.map(() => useSharedValue(0));

  const handleClickBtn = () => {
    setClicked(!clicked);

    // Change item positions and opacity to make them appear
    itemPositions.forEach((position, index) => {
      position.value = withTiming(
        clicked ? 0 : (index + 1) * 50, // Move the items upward
        { duration: 500, easing: Easing.bezier(0.68, -0.6, 0.32, 1.6) }
      );
    });

    itemOpacities.forEach((opacity) => {
      opacity.value = withTiming(
        clicked ? 0 : 1, // Fade in and out depending on the click state
        { duration: 500, easing: Easing.bezier(0.68, -0.6, 0.32, 1.6) }
      );
    });
  };

  const Item = ({ index, iconName }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: itemPositions[index].value }], // Animation for translation
      opacity: itemOpacities[index].value, // Animation for opacity
    }));

    return (
      <Animated.View style={[styles.fabItem, animatedStyle]}>
        {/* Allow text to expand without moving the openContainer */}
        <View style={styles.textContainer}>
          <DQ_Paragraph content="dsvsd" fontFamily='Nexa Light' textColor='white' textAlign='right' />
        </View>
        <TouchableOpacity style={styles.openContainer} disabled={!clicked}>
          <Icon name={iconName} size={18} color="blue" iconStyle='solid' />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.rootElement}>
      <TouchableOpacity onPress={handleClickBtn} style={styles.mainContainer}>
        <View style={styles.mainButton}>
          <Icon name={clicked ? 'xmark' : 'list'} size={18} color="white" iconStyle='solid' />
        </View>
      </TouchableOpacity>
      <View style={styles.itemsContainer}>
        {items.map((iconName, index) => (
          <Item key={index} index={index} iconName={iconName} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
  },
  mainContainer: {
    flex:0.2
  },
  mainButton: {
    backgroundColor: '#ffbe26',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    elevation: 5,
  },
  openContainer: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    elevation: 4,
  },
  itemsContainer: {
    width:190,
    position:'absolute',
    top:40,
    left:-150,
  },
  fabItem: {
    flex:1,
    marginBottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
    gap:20

  },
  textContainer: {
    flex: 1,
  },
});
