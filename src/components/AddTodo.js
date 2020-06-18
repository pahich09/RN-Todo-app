import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {THEME} from '../theme';
import {Entypo} from '@expo/vector-icons';

export const AddTodo = ({onAdd}) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) {
      onAdd(value);
      setValue('');
    } else {
      Alert.alert('Название не может быть пустым');
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder='Введите заметку'
        autoCorrect={false}
      />
      <Entypo.Button
        onPress={pressHandler}
        name='circle-with-plus'
      >Добавить
      </Entypo.Button>
      {/*<Button*/}
      {/*  title='Добавить'*/}
      {/*  onPress={pressHandler}*/}
      {/*  color={THEME.SUCCESS_COLOR}*/}
      {/*/>*/}
    </View>
  );
};


const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '70%',
    padding: 7,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});
