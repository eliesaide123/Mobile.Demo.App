import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

const DQ_InsuredCard = ({ title, count, children, locked = false }: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const getDynamicFontSize = (text : any) => {
    const length = String(text).length;
    if (length <= 10) return 16; // Short text, larger font
    if (length <= 20) return 14; // Medium text, medium font
    if (length <= 30) return 12; // Long text, smaller font
    return 10; // Very long text, smallest font
  };

  // Open the card by default if count == 1 and start the animation
  useEffect(() => {
    if (count === 1 && !locked) {
      setCollapsed(false); // Open the card automatically if there's only 1 item
      Animated.timing(animation, {
        toValue: 1, // Trigger the expand animation (fade in content)
        duration: 300, // Duration for the animation
        useNativeDriver: false, // Use native driver for better performance
      }).start();
    }
  }, [count]);

  const toggleCollapse = () => {
    if (locked) return;
    setCollapsed(!collapsed);

    // Animate the content visibility (opacity) and the chevron icon rotation
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0, // Fade in/out effect
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
  const backgroundColor = collapsed ? locked ? '#0160ae' : 'white' : '#0160ae';
  const color = collapsed ? locked ? 'white' : 'black' : 'white';
  const chevronColor = collapsed ? locked ? '#0160ae' : 'black' : 'white';

  return (
    <View style={[styles.cardBorder, { backgroundColor }]}>
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <View style={styles.InlineElements}>
          <Text style={[styles.textFormat, { color, fontSize: locked? 13 : getDynamicFontSize(title), textAlign:'left' }]}>{title}</Text>
          <View style={styles.InlineElements}>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Icon name="chevron-down" size={14} color={chevronColor} iconStyle="solid" />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          opacity: opacityInterpolate, // Apply the opacity fade effect here
          marginTop: 45,
          width: '100%',
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
    height: 80, // Fixed height for the card to remain the same size    
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
