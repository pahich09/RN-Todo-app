import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../types';

export const todoReducer = (state, {type, payload}) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now().toString(),
          title: payload
        }]
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(item => {
          if (item.id === payload.id) {
            item.title = payload.title;
          }
          return item;
        })
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(el => el.id !== payload)
      };
    default:
      return state;
  }
};
