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

export const todoReducer = (state, {type, payload}) => {
  switch (type) {
    case ADD_TODO:
      const {id, title} = payload;
      return {
        ...state,
        todos: [...state.todos, {id, title}]
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
    case SHOW_LOADER:
      return {
        ...state, loading: true
      };
    case HIDE_LOADER:
      return {
        ...state, loading: false
      };
    case SHOW_ERROR:
      return {
        ...state, error: payload
      };
    case CLEAR_ERROR:
      return {
        ...state, error: null
      };
    case FETCH_TODOS:
      return {
        ...state, todos: payload
      };
    default:
      return state;
  }
};
