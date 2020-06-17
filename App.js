import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Navbar} from './src/Navbar';
import {AddTodo} from './src/AddTodo';


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
            todos.map(el => <Text key={el.id}>{el.title}</Text>)
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
