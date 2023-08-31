import { createContext, useContext, useState } from 'react';

interface CheckboxContextType {
  checkboxStates: boolean[][];
  handleCheckboxChange: (questionIndex: number, checkboxIndex: number) => void;
  likertAnswers: { [key: number]: number };
}

const defaultValue: CheckboxContextType = {
  checkboxStates: [],
  handleCheckboxChange: () => {},
  likertAnswers: {},
};

const CheckboxContext = createContext<CheckboxContextType>(defaultValue);

export function useCheckboxContext() {
  return useContext(CheckboxContext);
}

export function CheckboxProvider({ children } : any) {

    const [checkboxStates, setCheckboxStates] = useState(() => Array.from({ length: 4 }, () => new Array(5).fill(false)));
    const [likertAnswers, setLikertAnswers] = useState({})
    
    const handleCheckboxChange = (questionIndex: number, checkboxIndex: number) => {
      if (questionIndex === -1) {
        setCheckboxStates(Array.from({ length: 5 }, () => new Array(5).fill(false)));
        return;
      }
    
      setCheckboxStates(prevStates => {
        const newStates = [...prevStates];
        newStates[questionIndex] = newStates[questionIndex].map((_, index) => index === checkboxIndex);
        return newStates;
      });
    
      setLikertAnswers(prevState => ({
        ...prevState,
        [questionIndex]: checkboxIndex + 1, // Set the selected checkbox index + 1 as the answer
      }));
    };
    
      
    return (
      <CheckboxContext.Provider value={{ checkboxStates, handleCheckboxChange,  likertAnswers }}>
        {children}
      </CheckboxContext.Provider>
    );
  }