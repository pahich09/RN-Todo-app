import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';

export const AddTodo = ({onAdd}) => {
  const pressHandler = () => {
    onAdd('new item');
  };

  return (
    <View style={styles.block}>
      <TextInput style={styles.input}/>
      <Button title='Добавить' onPress={pressHandler}/>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '70%',
    padding: 7,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab'
  }
});
