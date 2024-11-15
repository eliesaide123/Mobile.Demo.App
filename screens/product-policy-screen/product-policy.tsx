/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import {ProductPolicyService} from './service/product-policy.service';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Card from '../../components/DQ_Card';
import DQ_InnerCard_Grid from '../../components/DQ_InnerCard_Grid';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import DQ_GoButton from '../../components/DQ_GoButton';
import DQ_Badge from '../../components/DQ_Badge';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import _shared from '../common';
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

const Item = ({
  name,
  groupCode,
  nbrPolicies,
  navigation,
}: {
  name: string;
  groupCode: string;
  nbrPolicies: number;
  navigation: NativeStackScreenProps<any>['navigation'];
}) => {
  const imageName = `${groupCode.toLowerCase()}.png`;
  const [isLongPressed, setIsLongPress] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    setIsLongPress(true);
    Animated.timing(scaleAnim, {
      toValue: 1.1, // Scale up slightly
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsLongPress(false);
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale back to normal
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (nbrPolicies > 0)
      navigation.navigate('PolicyList', {
        groupCode,
      });
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}>
      <View style={styles.Image_Container}>
        <View
          style={[styles.Inline_Image, isLongPressed && styles.longPressStyle]}>
          <Image
            source={imageMapping[imageName]}
            style={[
              styles.Rounded_Image,
              isLongPressed && styles.longPressImage,
            ]}
            resizeMode="contain"
          />
        </View>
        {nbrPolicies > 0 && <DQ_Badge text={nbrPolicies} />}
        <View style={styles.InlineText}>
          <Text style={styles.Product_Name}>{name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function ProductPolicy({navigation, route}: any) {
  const [prodGroups, setProdGroups] = useState<any[]>([]);
  const [osPremiums, setOsPremiums] = useState<any[]>([]);
  const [osClaims, setOsClaims] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [pendingRenewals, setPendingRenewals] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [openCard, setOpenCard] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setUserId(_shared.userId);
    Get_CS_Connect(_shared.userId);
  }, []);

  const Get_CS_Connect = async (userId: string) => {
    setIsLoading(true)
    let _UserPin = '';
    if(route.params){
      const {pin : UserPin} = route.params;
      _UserPin = String(UserPin)
    }
    const result = await ProductPolicyService(userId, _UserPin);
    const roles = result.responseData.userData[0].roles;
    const _pin = result.user_Pin;
    _shared.pin = _pin;
    setPin(_pin);
    const role = result.user_Role;
    _shared.role = role;
    setRole(role);
    setRoles(roles);

    if (result) {
      if (result.responseData.prodGroups) {
        const sortedProdGroups = result.responseData.prodGroups.sort(
          (a: any, b: any) => a.groupSeq - b.groupSeq,
        );
        setProdGroups(sortedProdGroups);
      }
      if (result.responseData.osPremiums)
        setOsPremiums(result.responseData.osPremiums);
      if (result.responseData.osClaims)
        setOsClaims(result.responseData.osClaims);
      if (result.responseData.pendingRequests)
        setPendingRequests(result.responseData.pendingRequests);
      if (result.responseData.pendingRenewals)
        setPendingRenewals(result.responseData.pendingRenewals);
    }

    setIsLoading(false)
  };

  const handleCardPress = (cardId:any) => {
    setOpenCard(prevOpenCard => (prevOpenCard === cardId ? null : cardId));
  };

  return (
    <SafeAreaView>
      {!isLoading && (
        <View style={{marginTop: 10}}>
          <DQ_BaseHeader
            style={styles.mainHeader}
            press={() => navigation.goBack()}
            navigation={navigation}
            roleNumber={roles.length}
            userId={userId}
          />
          <ScrollView>
            <View style={styles.Products_Container}>
              <FlatList
                horizontal
                data={prodGroups}
                renderItem={({item}) => (
                  <Item
                    name={item.groupName}
                    groupCode={item.groupCode}
                    nbrPolicies={item.nbrPolicies}
                    navigation={navigation}
                  />
                )}
                keyExtractor={item => item.groupSeq.toString()}
              />
            </View>
            <View style={styles.cardsContainer}>
              {osPremiums && (
                <DQ_Card
                  title="My Outstanding Premiums"
                  count={osPremiums[0]?.nbrPremiums}
                  isOpen={openCard === 'osPremiums'}
                  onPress={() => handleCardPress('osPremiums')}>
                  <DQ_InnerCard_Grid buttonText="Pay Online" buttonWidth={120}>
                    <View style={styles.InlineElements}>
                      <DQ_Paragraph
                        content={osPremiums[0]?.nbrPremiums}
                        textColor="black"
                        fontSize={14}
                      />
                      <DQ_Paragraph
                        content={'Premiums'}
                        fontSize={14}
                        textColor="black"
                      />
                      <DQ_Paragraph
                        content={osPremiums[0]?.fresh ? 'Fresh' : ''}
                        textColor="black"
                        fontSize={14}
                      />
                      <DQ_Paragraph
                        content={
                          osPremiums[0]?.osAmount +
                          ' ' +
                          osPremiums[0]?.currency
                        }
                        textColor="#7dadd6"
                        fontSize={14}
                      />
                    </View>
                  </DQ_InnerCard_Grid>
                </DQ_Card>
              )}
              {osClaims && (
                <DQ_Card
                  title="My Claims"
                  count={osClaims[0]?.nbrOSClaims}
                  isOpen={openCard === 'osClaims'}
                  onPress={() => handleCardPress('osClaims')}>
                  <DQ_InnerCard_Grid
                    buttonText="Check My Claims"
                    buttonWidth={160}>
                    <View style={styles.TwoInlineElements}>
                      <DQ_Paragraph
                        content={osClaims[0]?.nbrOSClaims}
                        textColor="black"
                        fontSize={14}
                      />
                      <DQ_Paragraph
                        content={'Outstanding Claims'}
                        fontSize={14}
                        textColor="black"
                      />
                      <DQ_Paragraph
                        content={''}
                        fontSize={14}
                        textColor="black"
                      />
                      <DQ_Paragraph
                        content={''}
                        fontSize={14}
                        textColor="black"
                      />
                    </View>
                    <View style={styles.InlineElements}>
                      <DQ_Paragraph
                        content={osClaims[0]?.nbrReadyToSettle}
                        fontSize={14}
                      />
                      <View style={{width: 70}}>
                        <DQ_Paragraph
                          content={'Ready to Settle'}
                          fontSize={14}
                          textColor="black"
                        />
                      </View>
                      <DQ_Paragraph
                        content={osClaims[0]?.fresh ? 'Fresh' : ''}
                        textColor="black"
                        fontSize={14}
                      />
                      <DQ_Paragraph
                        content={
                          osClaims[0]?.r2SAmount + ' ' + osClaims[0]?.currency
                        }
                        textColor="#7dadd6"
                        fontSize={14}
                      />
                    </View>
                  </DQ_InnerCard_Grid>
                </DQ_Card>
              )}
              {pendingRenewals && (
                <DQ_GoButton
                  title="Renewals"
                  count={pendingRenewals[0]?.nbrRenewals}
                />
              )}
              {pendingRequests && (
                <DQ_GoButton
                  title="Pending Requests"
                  count={pendingRequests[0]?.nbrRequests}
                />
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Products_Container: {
    paddingTop: 15,
  },
  longPressStyle: {
    backgroundColor: '#0160ae',
  },
  longPressImage: {
    tintColor: 'white',
  },
  Image_Container: {
    padding: 1,
    marginTop: 5,
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
  mainHeader: {
    flex: 1,
  },
  cardsContainer: {
    marginTop: 30,
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  TwoInlineElements: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    padding: 5,
  },
});
