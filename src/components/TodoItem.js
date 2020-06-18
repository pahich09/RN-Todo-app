import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../theme';

export const TodoItem = ({todo, onRemove, onOpen}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.45}
      onLongPress={onRemove.bind(null, todo.id)}
      onPress={()=>onOpen(todo.id)}
    >
      <View style={styles.todos}>
        <Text>
          {todo.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todos: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
    marginBottom: 10
  },
});
