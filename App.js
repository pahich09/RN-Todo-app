import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import {Navbar} from './src/components/Navbar';
import {MainScreen} from './src/screens/MainScreen';
import {TodoScreen} from './src/screens/TodoScreen';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [todos, setTodos] = useState([
    {id: '1', title: 'todo #1'},
    {id: '2', title: 'todo #2'},
  ]);
  const [todoId, setTodoId] = useState(null);

  if (!isReady) {
    return <AppLoading
      startAsync={loadApplication}
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />;
  }

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
    const deletedTodo = todos.find(el => el.id === id);
    Alert.alert(
      'Удаление',
      `Вы действительно хотите удалить ${deletedTodo.title}`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Да',
          onPress: () => setTodos(prev => prev.filter(todo => todo.id !== id))
        }
      ],
      {cancelable: false}
    );
    setTodoId(null);
  };

  const updateTodo = (id, title) => {
    setTodos(prev => prev.map(item => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    }));
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );
  if (todoId) {
    const selectedTodo = todos.find(el => el.id === todoId);
    content = <TodoScreen
      goBack={() => setTodoId(null)}
      todo={selectedTodo}
      onRemove={removeTodo}
      onSave={updateTodo}
    />;
  }

  return (
    <View>
      <Navbar title='Todo App'/>
      <View style={styles.container}>
        {content}
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
