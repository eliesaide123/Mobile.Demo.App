/* eslint-disable no-trailing-spaces */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_TabView from '../../components/DQ_TabView';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Button from '../../components/DQ_Button';
 import { getLocalizedEntry } from '../../Shared/SharedFunctions'; 

const AgentSearchScreen = () => {

    const FirstNamePlaceHolder = getLocalizedEntry('AgentSearchScreen', 'FirstName');
    const FatherNamePlaceHolder = getLocalizedEntry('AgentSearchScreen', 'FathesName');
    const LastNamePlaceHolder = getLocalizedEntry('AgentSearchScreen', 'LastName');
    const PolicyNumberPlaceHolder = getLocalizedEntry('AgentSearchScreen', 'PolicyNumber');
    const HintTextPolicyNumberPlaceHolder = getLocalizedEntry('AgentSearchScreen', 'HintTextPolicyNumber');
    const PinPlaceHolder = getLocalizedEntry('AgentSearchScreen', 'Pin');

    const tabs = [
        {
          key: 'first',
          title: 'Name',
          content: 
          <View style={styles.TextBox}>
          <DQ_TextBox placeholder={FirstNamePlaceHolder} />
          <DQ_TextBox placeholder={FatherNamePlaceHolder} />
          <DQ_TextBox placeholder={LastNamePlaceHolder} />
        </View>,
        },
        {
          key: 'second',
          title: 'Policy Number',
          content: 
          <View style={styles.TextBox}>
            <DQ_TextBox 
            placeholder={PolicyNumberPlaceHolder} 
            hintText = {HintTextPolicyNumberPlaceHolder}
            />
          </View>,
        },
        {
          key: 'third',
          title: 'PIN',
          content: 
          <View style={styles.TextBox}>
            <DQ_TextBox placeholder={PinPlaceHolder} />
          </View>,
        },
      ];
  return (
    <SafeAreaView style={styles.container}>      
      <DQ_BaseHeader />

      <Text style={styles.mainTitle}>p297</Text>
     
       <View style={styles.ButtonView}>
         <DQ_Button title='Renewal Portal System'></DQ_Button>
      </View>

      <View style={styles.SearchText}>
        <Text>Search by</Text>
      </View>

      <DQ_TabView tabs={tabs} />
      
      {/* <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  portalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  portalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ButtonView : {
    paddingLeft : 50,
    paddingRight: 50,
    paddingBottom : 20,
  },
  SearchText: {
    fontSize: 50,
    paddingLeft: 15,
    paddingBottom: 20,
  },
  TextBox : {
    paddingTop : 20,
    flex:1,
    width:'100%',
  }
});

export default AgentSearchScreen;
