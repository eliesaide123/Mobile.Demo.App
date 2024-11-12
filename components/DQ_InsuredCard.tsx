import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

const DQ_InsuredCard = ({ title, children }: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    // Toggle the collapsed state to trigger reanimation
    setCollapsed(!collapsed);

    // Animate the content visibility (opacity) and the chevron icon rotation
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 300, // Duration for expansion/collapse
      useNativeDriver: false, // Use native driver
    }).start();
  };

  // Interpolating the opacity of the content (children only)
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Fade in and out effect for content
  });

  // Rotating the chevron icon
  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'], // Rotates icon for collapse/expand
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
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Icon name="chevron-down" size={14} color={'black'} iconStyle="solid" />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Content area remains fixed height, but children will fade in and out */}
      <Animated.View
        style={{
          opacity: opacityInterpolate, // Apply the opacity fade effect here
          marginTop: 20,
        }}
      >
        {children}
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
    height: 70, // Fixed height for the card to remain the same size
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  textFormat: {
    fontWeight: '600',
    color: 'black',
  },
});

export default DQ_InsuredCard;
