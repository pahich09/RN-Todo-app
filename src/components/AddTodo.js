import React, {useState} from 'react';
import {Alert, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import {THEME} from '../theme';
import {Entypo} from '@expo/vector-icons';

export const AddTodo = ({onAdd}) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) {
      onAdd(value);
      setValue('');
      Keyboard.dismiss();
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
    width: '65%',
    padding: 7,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});
