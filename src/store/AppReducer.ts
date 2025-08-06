'use client';

import { Reducer } from 'react';
import { localStorageDelete, localStorageSet } from '../utils/localStorage';
import { setApiToken } from '@/services/api';

export type Path = string | Array<string | number>;

export interface StoredUser {
    id: string;
    name: string;
    avatar: null | string; // Assuming avatar can be a URL or null
    email: string;
  }

export interface AppStoreState {
  isAuthenticated: boolean;
  user: StoredUser | null
  token: string | null;
}

interface LoginDispatchAction {
  type: 'LOG_IN';
  payload: { token: string , user: StoredUser};
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
  console.log('AppReducer action:', action);
  switch (action.type) {
    case 'LOG_IN':
      localStorageSet('token', action.payload.token);
      setApiToken(action.payload.token);

      localStorageSet('user', action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'LOG_OUT':
      localStorageDelete('token');
      localStorageDelete('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      throw new Error('Command not found in App Reducer');
  }
};

export { AppReducer };