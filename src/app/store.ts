import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/models/taskSlice';
import { saveState, loadState } from './persistStorage';

const preloadedState = {
  tasks: loadState() || []
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer
  },
  preloadedState
});


store.subscribe(() => {
  saveState(store.getState().tasks);
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;





