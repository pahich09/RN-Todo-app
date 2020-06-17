import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Navbar} from './src/Navbar';
import {AddTodo} from './src/AddTodo';
import {TodoItem} from './src/TodoItem';


export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = title => {
    setTodos(prev => [
        ...prev, {
          id: Date.now().toString(),
          title
        }
      ]
    );
  };

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <View>
      <Navbar title='Todo App'/>
      <View style={styles.container}>
        <AddTodo onAdd={addTodo}/>
        <FlatList
          keyExtractor={item => item.id}
          data={todos}
          renderItem={({item}) => <TodoItem
            todos={item}
            onRemove={removeTodo}
          />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
