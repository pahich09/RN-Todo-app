import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';

export const TodoItem = ({todo, onRemove, onOpen}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.45}
      onLongPress={onRemove.bind(null, todo.id)}
      onPress={()=>onOpen(todo.id)}
    >
      <View style={styles.todos}>
        <AppText style={styles.title}>
          {todo.title}
        </AppText>
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
