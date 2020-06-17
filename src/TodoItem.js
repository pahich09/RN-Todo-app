import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const TodoItem = ({todos}) => {
  return (
    <View style={styles.todo}>
      <Text>
        {todos.title}
      </Text>
    </View>
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
