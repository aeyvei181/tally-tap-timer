import { Counter } from "@/types/counter";

const STORAGE_KEY = "tally-counters";

export const getCounters = (): Counter[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCounters = (counters: Counter[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
};

export const addCounter = (counter: Counter): void => {
  const counters = getCounters();
  counters.push(counter);
  saveCounters(counters);
};

export const updateCounter = (id: string, updates: Partial<Counter>): void => {
  const counters = getCounters();
  const index = counters.findIndex(c => c.id === id);
  if (index !== -1) {
    counters[index] = { ...counters[index], ...updates };
    saveCounters(counters);
  }
};

export const deleteCounter = (id: string): void => {
  const counters = getCounters().filter(c => c.id !== id);
  saveCounters(counters);
};

export const getCounter = (id: string): Counter | undefined => {
  return getCounters().find(c => c.id === id);
};
