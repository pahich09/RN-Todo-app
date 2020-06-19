import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';
import {TodoContext} from './todocontext';
import {todoReducer} from './todoReducer';
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../types';
import {ScreenContext} from '../screen/screenContext';

export const TodoState = ({children}) => {
  const initialState = {
    todos: [{id: '1', title: 'todo from context'},]
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const {changeScreens} = useContext(ScreenContext);

  const addTodo = title => dispatch({type: ADD_TODO, payload: title});
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


  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      addTodo,
      updateTodo,
      removeTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};
