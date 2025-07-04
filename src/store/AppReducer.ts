'use client';

import { Reducer } from 'react';
import { localStorageDelete, localStorageSet } from '../utils/localStorage';

export type Path = string | Array<string | number>;

export interface AppStoreState {
  isAuthenticated: boolean;
  token: string;
}

interface LoginDispatchAction {
  type: 'LOG_IN';
  payload: { token: string };
}

interface LogoutDispatchAction {
  type: 'LOG_OUT';
}

export type DispatchAction = LoginDispatchAction | LogoutDispatchAction;

/**
 * Reducer for global AppStore using "Redux styled" actions
 */
const AppReducer: Reducer<AppStoreState, DispatchAction> = (
  state: AppStoreState,
  action
): AppStoreState => {
  switch (action.type) {
    case 'LOG_IN':
      localStorageSet('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case 'LOG_OUT':
      localStorageDelete('token');
      return {
        ...state,
        isAuthenticated: false,
        token: '',
      };

    default:
      throw new Error('Command not found in App Reducer');
  }
};

export { AppReducer };