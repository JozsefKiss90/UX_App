import { createContext, useContext, useState } from 'react';

interface CheckboxContextType {
    checkboxStates: boolean[][];
    handleCheckboxChange: (questionIndex: number, checkboxIndex: number) => void;
}


  const defaultValue: CheckboxContextType = {
    checkboxStates: [],
    handleCheckboxChange: () => {},
  };
  
  const CheckboxContext = createContext<CheckboxContextType>(defaultValue);

export function useCheckboxContext() {
  return useContext(CheckboxContext);
}

export function CheckboxProvider({ children }) {

    const [checkboxStates, setCheckboxStates] = useState(() => Array.from({ length: 4 }, () => new Array(5).fill(false)));
  
    const handleCheckboxChange = (questionIndex: number, checkboxIndex: number) => {
        if(questionIndex === -1) {
            setCheckboxStates(Array.from({ length: 4 }, () => new Array(5).fill(false)));
            return;
        }
    
        setCheckboxStates(prevStates => {
            const newStates = [...prevStates];
            if (newStates[questionIndex]) {
                newStates[questionIndex][checkboxIndex] = !newStates[questionIndex][checkboxIndex];
            }
            return newStates;
        });
    };
       
      
    return (
      <CheckboxContext.Provider value={{ checkboxStates, handleCheckboxChange }}>
        {children}
      </CheckboxContext.Provider>
    );
  }
  

