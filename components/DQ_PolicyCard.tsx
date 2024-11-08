import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DQ_Paragraph from './DQ_Paragraph';
import Icon from '@react-native-vector-icons/fontawesome6';

export default function DQ_PolicyCard({src, item}: any) {
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.InlineElements, styles.spaceBetween]}>
        <View style={[styles.InlineElements, styles.gap20]}>
          <Image source={src} style={[styles.imageTint, styles.cardImage]} resizeMode='contain' />
          <DQ_Paragraph
            content={item.policyNo}
            textColor="white"
            fontSize={14}
            fontFamily="Nexa Bold"
          />
        </View>
        <View>
          <Icon
            name="arrow-right"
            size={14}
            color="#ffbe23"
            iconStyle="solid"
            style={{marginHorizontal: 2}}
          />
        </View>
      </View>
      <View style={[styles.InlineElements, styles.gap5, styles.marginTop15]}>
        <Image source={src} style={[styles.imageTint, styles.pinPoint]} resizeMode='contain' />
        <DQ_Paragraph
          content={item.productTag}
          textColor="white"
          fontSize={10}
        />
      </View>
      <View
        style={[
          styles.InlineElements,
          styles.gap5,
          styles.marginLeft20,
          styles.marginTop10,
        ]}>
        <DQ_Paragraph
          content={item.policyTag}
          textColor="white"
          fontSize={10}
        />
      </View>
      {item.expiryTag && (
        <View style={[styles.InlineElements, styles.gap6, styles.marginTop15]}>
          <Icon
            name="calendar-days"
            size={12}
            color="white"
            iconStyle="solid"
            style={{marginHorizontal: 2}}
          />
          <DQ_Paragraph
            content={item.expiryTag}
            textColor="white"
            fontSize={10}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#005faf',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
  },
  spaceBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageTint: {
    tintColor: 'white',
  },
  cardImage: {
    width: 26,
    height: 16,
  },
  InlineElements: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinPoint: {
    width: 15,
    height: 9,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop15: {
    marginTop: 15,
  },
  marginLeft20: {
    marginLeft: 20,
  },
  gap5: {
    gap: 5,
  },
  gap6: {
    gap: 6,
  },
  gap20: {
    gap: 20,
  },
});
