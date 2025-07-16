import type { Task } from "../entities/task/types";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error('Failed to load state', e);
    return undefined;
  }
};

export const saveState = (state: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
};