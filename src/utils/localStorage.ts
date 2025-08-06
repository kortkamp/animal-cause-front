/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Smartly reads value from localStorage
 */
export function localStorageGet<T>(name: string): T {
  const valueFromStore = localStorage.getItem(name);

  if(!valueFromStore) {
    throw new Error(`No value found in localStorage for key "${name}"`);
  }

  try {
    const jsonParsed: T = JSON.parse(valueFromStore);
 
    return jsonParsed; // We successfully parse JS value from the store
  
  } catch (error) {
    throw new Error(`Error parsing value from localStorage for key "${name}": ${error}`);
  }
}

export function localStorageGetString(name: string): string | null {
  const valueFromStore = localStorage.getItem(name);

  return valueFromStore;
}

/**
 * Smartly writes value into localStorage
 */
export function localStorageSet(name: string, value: any) {
  if (typeof value === 'undefined') {
    return; // Do not store undefined values
  }
  let valueAsString: string;
  if (typeof value === 'object') {
    valueAsString = JSON.stringify(value);
  } else {
    valueAsString = String(value);
  }

  localStorage.setItem(name, valueAsString);
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Deletes value by name from localStorage,
 * if specified name is empty entire localStorage is cleared.
 */
export function localStorageDelete(name: string) {
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
}