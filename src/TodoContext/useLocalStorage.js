import React from "react";

const useLocalStorage = (itemName, initialValue) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem; //este sera la lista de todos pero sin ser parseado
    
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
      
    }, 1000);
  }, []);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem); //actualizacion en local storage
      setItem(newItem); //actualizacion en el estado de react
    } catch (error) {
      setError(error);
    }
  };

  return {item, saveItem, loading, error};
}

export {useLocalStorage};