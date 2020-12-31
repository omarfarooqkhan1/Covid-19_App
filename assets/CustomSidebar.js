import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

export default function CustomSidebar(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#24A0ED'}}>
      <Image
        source={require('./Covid.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props} style= {{ backgroundColor: '#24A0ED' }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 200,
    height: 100,
    alignSelf:'center',
  },
});