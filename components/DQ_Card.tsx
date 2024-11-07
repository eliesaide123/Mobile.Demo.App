import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

const DQ_Card = ({ title, count = 0, children }: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    if (count === 0) return;
    // Fade out first, then collapse, then change color back to white
    Animated.sequence([
      // Fade out first
      Animated.timing(animation, {
        toValue: 0,
        duration: 300, // Short fade-out duration
        useNativeDriver: false,
      }),
      // Collapse height after fade-out
      Animated.timing(animation, {
        toValue: collapsed ? 1 : 0,
        duration: 300, // Duration for height expansion/collapse
        useNativeDriver: false,
      }),
    ]).start();

    // Toggle the collapsed state to trigger reanimation
    setCollapsed(!collapsed);
  };

  // Interpolating height for the expanded content
  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 170], // Adjust height for expanded content
  });

  // Rotating the chevron icon
  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'], // Rotates icon for collapse/expand
  });

  // Fade effect: fade in when expanding and fade out when collapsing
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Fade in and out effect
  });

  // Static background color based on collapsed state
  const backgroundColor = collapsed ? 'white' : '#0160ae';
  const color = collapsed ? 'black' : 'white';

  return (
    <View style={[styles.cardBorder, { backgroundColor }]}>
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <View style={styles.InlineElements}>
          <Text style={[styles.textFormat, { color }]}>{title}</Text>
          <View style={styles.InlineElements}>
            <View
              style={[
                styles.bubble,
                { backgroundColor: count > 0 ? '#f06e1e' : '#0160ae' },
              ]}
            >
              <Text style={styles.whiteText}>{count}</Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
               <Icon name="chevron-down" size={14} color={count > 0 ? 'black' : 'white'} iconStyle="solid" />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{ height: heightInterpolate }}>
        <Animated.View
          style={{
            opacity: opacityInterpolate, // Apply the opacity fade effect here
            marginTop: 20,
          }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBorder: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    margin: 10,
    padding: 15,
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  bubble: {
    width: 24, // Adjust width for a better fit
    height: 24, // Adjust height for a better fit
    borderRadius: 12, // Circle shape
    justifyContent: 'center',
    alignItems: 'center', // Center text inside the bubble
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
  },
  textFormat: {
    fontWeight: '600',
    color: 'black',
  },
});

export default DQ_Card;
