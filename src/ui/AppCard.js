import React from 'react';
import {StyleSheet, View} from 'react-native';

export const AppCard = props => (
  <View style={{...styles.default, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 3
    },
    elevation: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 15
  }
});
