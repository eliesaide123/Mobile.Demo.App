import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const logo = require('../assets/images/DQ_LOGO.png'); //

export default function DQBaseHeader({navigation} : any) {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={18} color="#FFFFFF" iconStyle='solid' />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#005faf',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderStartEndRadius: 20,
        borderEndEndRadius: 20,
    },
    backButton: {
        marginTop: 30,
        padding: 15,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        flex: 1,
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop:20,
        alignContent: 'center',
    },
});
