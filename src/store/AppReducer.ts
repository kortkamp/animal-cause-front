'use client';

import { Reducer } from 'react';
import { localStorageDelete, localStorageSet } from '../utils/localStorage';
import { setApiToken } from '@/services/api';

export type Path = string | Array<string | number>;

export interface StoredUser {
    id: string;
    name: string;
    avatar: null | { url: string }; // Assuming avatar can be a URL or null
    email: string;
  }

export interface CreateCauseStored {
  title: string | null;
  description: string| null;
  deadlineDate: string | null;

  state: string| null;
  city: string| null;
  neighborhood: string| null;
  address: string| null;
  number: string| null;
  complement: string| null;
  zipCode: string| null;
  latitude: string| null;
  longitude: string| null;

  goalAmount: string| null; 
}

export interface AppStoreState {
  isAuthenticated: boolean;
  user: StoredUser | null
  token: string | null;
  causeStored: CreateCauseStored | null;
}

interface LoginDispatchAction {
  type: 'LOG_IN';
  payload: { token: string , user: StoredUser};
}

interface SetCauseFieldDispatchAction {
  type: 'SET_CAUSE_FIELD';
  payload: Partial<CreateCauseStored>;
}

interface LoadCauseDispatchAction {
  type: 'LOAD_CAUSE';
  payload: CreateCauseStored | null; 
}

interface ClearCauseDispatchAction {
  type: 'CLEAR_CAUSE';
}

interface LogoutDispatchAction {
  type: 'LOG_OUT';
}

export type DispatchAction = 
  LoginDispatchAction 
  | LogoutDispatchAction 
  | SetCauseFieldDispatchAction
  | LoadCauseDispatchAction
  | ClearCauseDispatchAction;

/**
 * Reducer for global AppStore using "Redux styled" actions
 */
const AppReducer: Reducer<AppStoreState, DispatchAction> = (
  state: AppStoreState,
  action
): AppStoreState => {
  console.debug('AppReducer action:', action);
  switch (action.type) {

    case 'LOAD_CAUSE':

    return {
      ...state,
      causeStored: action.payload,
    };

    case 'CLEAR_CAUSE':
      localStorageDelete('causeCreation');
      return {
        ...state,
        causeStored: null,
      };

    case 'SET_CAUSE_FIELD':
      let causeCreation = state.causeStored || {} as CreateCauseStored;
      causeCreation = {
        ...causeCreation,
        ...action.payload,
      };
      localStorageSet('causeCreation', causeCreation);
      return {
        ...state,
        causeStored: causeCreation,
      };

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