import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';
import {TodoContext} from './todocontext';
import {todoReducer} from './todoReducer';
import {
  ADD_TODO,
  CLEAR_ERROR, FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from '../types';
import {ScreenContext} from '../screen/screenContext';

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const {changeScreens} = useContext(ScreenContext);

  const addTodo = async title => {
    const response = await fetch('https://rn-todo-a59de.firebaseio.com/todos.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    });
    const data = await response.json();
    const {name: id} = data;

    dispatch({type: ADD_TODO, payload: {title, id}});
  };
  const updateTodo = (id, title) => dispatch({
    type: UPDATE_TODO,
    payload: {id, title}
  });
  const removeTodo = id => {
    const deletedTodo = state.todos.find(el => el.id === id);
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
          onPress: () => {
            changeScreens(null);
            dispatch({type: REMOVE_TODO, payload: id});
          }
        }
      ],
      {cancelable: false}
    );
  };

  const fetchTodos = async () => {
    const response = await fetch('https://rn-todo-a59de.firebaseio.com/todos.json', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    const todos = Object.keys(data).map(key => ({...data[key], id: key}));
    setTimeout(()=>{
      dispatch({type: FETCH_TODOS, payload: todos});
    }, 3000)

  };

  const showLoader = () => dispatch({type: SHOW_LOADER});
  const hideLoader = () => dispatch({type: HIDE_LOADER});
  const showError = err => dispatch({type: SHOW_ERROR, payload: err});
  const clearError = () => dispatch({type: CLEAR_ERROR});


  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      updateTodo,
      removeTodo,
      fetchTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
};
