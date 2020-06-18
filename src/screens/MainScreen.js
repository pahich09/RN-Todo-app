import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {TodoItem} from '../components/TodoItem';

export const MainScreen = ({todos, addTodo, removeTodo, openTodo}) => {
  return (
    <View>
      <AddTodo onAdd={addTodo}/>
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={({item}) => <TodoItem
          todo={item}
          onRemove={removeTodo}
          onOpen={openTodo}
        />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
