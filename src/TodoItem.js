import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const TodoItem = ({todos, onRemove}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.45}
      onLongPress={onRemove.bind(null, todos.id)}
    >
      <View style={styles.todo}>
        <Text>
          {todos.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#eeeeee',
    borderRadius: 5,
    marginBottom: 10
  },
});
