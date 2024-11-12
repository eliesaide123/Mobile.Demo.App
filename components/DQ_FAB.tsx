import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import Icon from '@react-native-vector-icons/fontawesome6';
import DQ_Paragraph from './DQ_Paragraph';

export default function DQ_FAB({ clicked, setClicked }: any) {
  const items = ['list', 'xmark', 'list', 'list', 'list', 'list'];

  const itemPositions = items.map(() => useSharedValue(0));
  const itemOpacities = items.map(() => useSharedValue(0));

  const handleClickBtn = () => {
    // Toggle clicked state and immediately trigger animation
    setClicked((prev: boolean) => {
      const newClicked = !prev;

      // Change item positions and opacity to make them appear or disappear
      itemPositions.forEach((position, index) => {
        position.value = withSpring(
          newClicked ? (index + 1) * 50 : 0, // Move items upward when opened, reset when closed
          { damping: 15, stiffness: 200 } // Smooth animation
        );
      });

      itemOpacities.forEach((opacity) => {
        opacity.value = withSpring(
          newClicked ? 1 : 0, // Fade in when opened, fade out when closed
          { damping: 15, stiffness: 200 } // Smooth opacity transition
        );
      });

      return newClicked;
    });
  };

  const Item = ({ index, iconName }: any) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: itemPositions[index].value }], // Animation for translation
      opacity: itemOpacities[index].value, // Animation for opacity
    }));

    return (
      <Animated.View style={[styles.fabItem, animatedStyle]}>
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
      <View style={[styles.itemsContainer, clicked && styles.visible]}>
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
    flex: 0.2,
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
    width: 190,
    position: 'absolute',
    top: 40,
    left: -150,
    display: 'none', // Initially hidden
  },
  visible: {
    display: 'flex', // Show when clicked
  },
  fabItem: {
    flex: 1,
    marginBottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textContainer: {
    flex: 1,
  },
});
