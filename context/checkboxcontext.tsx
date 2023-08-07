import { createContext, useContext, useState } from 'react';

interface CheckboxContextType {
  checkboxStates: boolean[][];
  handleCheckboxChange: (questionIndex: number, checkboxIndex: number) => void;
  likertAnswers: { [key: number]: number };
  setLikertAnswers: (newAnswers: { [key: number]: number }) => void;
}

const defaultValue: CheckboxContextType = {
  checkboxStates: [],
  handleCheckboxChange: () => {},
  likertAnswers: {},
  setLikertAnswers: ()=>{}
};

const CheckboxContext = createContext<CheckboxContextType>(defaultValue);

export function useCheckboxContext() {
  return useContext(CheckboxContext);
}

export function CheckboxProvider({ children }) {

    const [checkboxStates, setCheckboxStates] = useState(() => Array.from({ length: 4 }, () => new Array(5).fill(false)));
    const [likertAnswers, setLikertAnswers] = useState({})
    
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
        let trueIndex
        setLikertAnswers((prevState : any) => (
          trueIndex = checkboxStates[Object.keys(prevState).length].findIndex((answer : Boolean )=> answer === true),
          {
          ...prevState,
          [Object.keys(prevState).length]: trueIndex + 1,
        }))
    };
    console.log(likertAnswers)
      
    return (
      <CheckboxContext.Provider value={{ checkboxStates, handleCheckboxChange,  likertAnswers }}>
        {children}
      </CheckboxContext.Provider>
    );
  }