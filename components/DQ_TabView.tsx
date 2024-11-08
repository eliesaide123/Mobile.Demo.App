import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

interface TabConfig {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface CustomTabViewProps {
  tabs: TabConfig[];
}

export function CustomTabView({ tabs }: CustomTabViewProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  // Define routes and scenes
  const routes = tabs.map(tab => ({ key: tab.key, title: tab.title }));
  const scenes = tabs.reduce((acc, tab) => {
    acc[tab.key] = () => (
      <View style={styles.tabContent}>
        {tab.content}
      </View>
    );
    return acc;
  }, {} as { [key: string]: React.ComponentType<any> });

  // Customize TabBar
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="black"
      inactiveColor="gray"
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap(scenes)}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background color of the container
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabIndicator: {
    backgroundColor: 'black',
  },
  tabLabel: {
    fontWeight: 'bold', 
  },
});

export default CustomTabView;
