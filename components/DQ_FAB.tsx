import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import {default as Ionicon} from '@react-native-vector-icons/ionicons';
import {default as FAIcon} from '@react-native-vector-icons/fontawesome6';
import DQ_Paragraph from './DQ_Paragraph';

export default function DQ_FAB({ clicked, setClicked, actions }: any) {
  const itemPositions = actions.map(() => useSharedValue(0));
  const itemOpacities = actions.map(() => useSharedValue(0));

  const handleClickBtn = () => {
    setClicked((prev: boolean) => {
      const newClicked = !prev;

      // Update the positions and opacity of each action item
      itemPositions.forEach((position: any, index: any) => {
        position.value = withSpring(newClicked ? (index + 1) * 15 : 0, { damping: 15, stiffness: 200 });
      });

      itemOpacities.forEach((opacity: any) => {
        opacity.value = withSpring(newClicked ? 1 : 0, { damping: 15, stiffness: 200 });
      });

      return newClicked;
    });
  };

  // Filter out actions where value is not "true"
  const filteredActions = actions.filter((item: any) => item.value === "true");

  // Render each action item with animation
  const Item = ({ title, index, iconName }: any) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: itemPositions[index].value }],
      opacity: itemOpacities[index].value,
    }));

    return (
      <Animated.View style={[styles.fabItem, animatedStyle]}>
        <View style={styles.textContainer}>
          <DQ_Paragraph content={title} fontFamily="Nexa Light" textColor="white" textAlign="right" />
        </View>
        <TouchableOpacity style={styles.openContainer} disabled={!clicked}>
          <FAIcon name={iconName} size={18} color="blue" iconStyle="solid" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.rootElement}>
      {/* Main button to toggle the state */}
      <TouchableOpacity onPress={handleClickBtn} style={styles.mainContainer}>
        <View style={styles.mainButton}>
          <Ionicon name={clicked ? 'close' : 'grid'} size={18} color="white" />
        </View>
      </TouchableOpacity>

      {/* Render the action items when clicked is true */}
      <Animated.View style={[styles.itemsContainer, { opacity: clicked ? 1 : 0 }]}>
        {clicked &&
          filteredActions.map((item: any, index: number) => {
            return (
              <Item key={index} title={item.title} index={index} iconName={item.iconName} />
            );
          })}
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
  },
  mainContainer: {
    flex: 0.2,
    zIndex: 10, // Ensure the main button is above other items
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
    top: 50,
    left: -150,
    display: 'flex',
    flexDirection: 'column',
  },
  fabItem: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop:-10
  },
  textContainer: {
    flex: 1,
  },
});
