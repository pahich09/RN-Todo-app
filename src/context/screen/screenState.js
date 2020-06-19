import React, {useReducer} from 'react';
import {ScreenContext} from './screenContext';
import {screenReducer} from './screenReducer';
import {CHANGE_SCREEN} from '../types';

export const ScreenState = ({children}) => {
  const [state, dispatch] = useReducer(screenReducer, null);
  const changeScreens = todoId => dispatch({
    type: CHANGE_SCREEN,
    payload: todoId
  });

  return <ScreenContext.Provider value={{todoId: state, changeScreens}}>
    {children}
  </ScreenContext.Provider>;
};
