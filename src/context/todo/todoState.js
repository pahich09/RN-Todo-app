import React, {useContext, useReducer} from 'react';
import {Alert} from 'react-native';
import {TodoContext} from './todocontext';
import {todoReducer} from './todoReducer';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from '../types';
import {ScreenContext} from '../screen/screenContext';
import {Http} from '../../http';

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const {changeScreens} = useContext(ScreenContext);

  const addTodo = async title => {
    clearError();
    try {
      const data = await Http.post(
        'https://rn-todo-a59de.firebaseio.com/todos.json',
        {title}
      );
      const {name: id} = data;
      dispatch({type: ADD_TODO, payload: {title, id}});
    } catch (e) {
      showError('Что-то пошло не так...');
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(`https://rn-todo-a59de.firebaseio.com/todos/${id}.json`, {title});
      dispatch({
        type: UPDATE_TODO,
        payload: {id, title}
      });
    } catch (e) {
      showError('Что-то пошло не так...');
    }
  };
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
          onPress: async () => {
            changeScreens(null);
            clearError();
            try {
              await Http.delete(`https://rn-todo-a59de.firebaseio.com/todos/${id}.json`);
              dispatch({type: REMOVE_TODO, payload: id});
            } catch (e) {
              showError('Что-то пошло не так...');
            }
          }
        }
      ],
      {cancelable: false}
    );
  };

  const fetchTodos = async () => {
    clearError();
    try {
      showLoader();
      const data = await Http.get('https://rn-todo-a59de.firebaseio.com/todos.json') || [];
      const todos = Object.keys(data).map(key => ({...data[key], id: key}));
      dispatch({type: FETCH_TODOS, payload: todos});
    } catch (e) {
      showError('Что-то пошло не так...');
    } finally {
      hideLoader();
    }
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
