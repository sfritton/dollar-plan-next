import store from './store';
import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;

export enum Status {
  INIT = 'INIT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface AsyncState {
  status: Status;
  error?: string;
}
