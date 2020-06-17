import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
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

  return (
    <View>
      <Navbar title='Todo App'/>
      <View style={styles.container}>
        <AddTodo onAdd={addTodo}/>
        <View>
          {
            todos.map(el => <TodoItem todos={el} key={el.id}/>)
          }
        </View>
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
