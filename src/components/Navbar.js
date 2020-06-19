import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';

export const Navbar = ({title}) => {
  return (
    <View style={{
      ...styles.navbar, ...Platform.select({
        ios: styles.navIos,
        android: styles.navAndroid
      })
    }}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  navAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navIos: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2
  }
  ,
  text: {
    fontSize: 24,
    color: '#ffffff'
  }
});
