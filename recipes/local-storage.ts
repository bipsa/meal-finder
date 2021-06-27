export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state:any) => {
  try {
    const saveableState = { ...state };
    delete saveableState.config;
    const serializedState = JSON.stringify(saveableState);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};