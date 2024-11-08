import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_TabView from '../../components/DQ_TabView';

const AgentSearchScreen = () => {

    const tabs = [
        {
          key: 'first',
          title: 'Name',
          content: 
          <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="First name" />
          <TextInput style={styles.input} placeholder="Father's name" />
          <TextInput style={styles.input} placeholder="Last name" />
        </View>,
        },
        {
          key: 'second',
          title: 'Policy Number',
          content: <Text>This is the content of Tab 2</Text>,
        },
        {
          key: 'third',
          title: 'PIN',
          content: <Text>This is the content of Tab 3</Text>,
        },
      ];
  return (
    <View style={styles.container}>
      {/* Header */}
      <DQ_BaseHeader />

      {/* Main Title */}
      <Text style={styles.mainTitle}>p297</Text>

      {/* Renewal Portal System Button */}
      <TouchableOpacity style={styles.portalButton}>
        <Text style={styles.portalButtonText}>Renewal Portal System</Text>
      </TouchableOpacity>

      {/* Tab View */}
      <DQ_TabView tabs={tabs} />
      

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
});

export default AgentSearchScreen;
