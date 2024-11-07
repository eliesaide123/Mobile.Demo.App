import {useEffect, useState} from 'react';
import { FlatList, Image, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import {ProductPolicyService} from './service/product-policy.service';

const imageMapping: {[key: string]: any} = {
  'health.png': require('../../assets/images/health.png'),
  'life.png': require('../../assets/images/life.png'),
  'motor.png': require('../../assets/images/motor.png'),
  'property.png': require('../../assets/images/property.png'),
  'personal.png': require('../../assets/images/personal.png'),
  'travel.png': require('../../assets/images/travel.png'),
  'investment.png': require('../../assets/images/investment.png'),
  'expat.png': require('../../assets/images/expat.png'),
  'liability.png': require('../../assets/images/liability.png'),
  'marine.png': require('../../assets/images/marine.png'),
  'engrisk.png': require('../../assets/images/engrisk.png'),
  'other.png': require('../../assets/images/other.png'),
  'protection.png': require('../../assets/images/protection.png'),
};

const Item = ({name, groupCode}: {name: string; groupCode: string}) => {
  const imageName = `${groupCode.toLowerCase()}.png`;

  return (
    <View style={styles.Image_Container}>
      <View style={styles.Inline_Image}>
        <Image
          source={imageMapping[imageName]}
          style={styles.Rounded_Image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.InlineText}>
        <Text style={styles.Product_Name}>{name}</Text>
      </View>
    </View>
  );
};

export default function ProductPolicy() {
  const [prodGroups, setProdGroups] = useState<any[]>([]);

  useEffect(() => {
    Get_CS_Connect();
  }, []);

  const Get_CS_Connect = async () => {
    const result = await ProductPolicyService();
    if (result && result.prodGroups) {
      setProdGroups(result.prodGroups);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.Products_Container}>
        <FlatList
          horizontal
          data={prodGroups}
          renderItem={({item}) => (
            <Item name={item.groupName} groupCode={item.groupCode} />
          )}
          keyExtractor={item => item.groupSeq.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Products_Container: {
    paddingTop: 35,
  },
  Image_Container: {
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    flex: 1,
  },
  Product_Name: {
    marginTop: 10,
    textAlign: 'center',
    width: 80,
    flexWrap: 'wrap',
    color: '#005faf',
    fontWeight: '700',
  },
  Rounded_Image: {
    width: 45,
    height: 45,
    padding: 10,
  },
  Inline_Image: {
    borderWidth: 1,
    borderColor: '#175384',
    borderRadius: 60,
    padding: 7,
    flex: 0.5,
  },
  InlineText: {
    flex: 0.5,
  },
});
