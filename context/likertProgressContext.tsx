import { createContext, useContext, useState, Dispatch, SetStateAction  } from 'react';

interface LikertProgressType {
    likertProgress: number;
    setLikertProgress: Dispatch<SetStateAction<number>>;
    feedback: string;
    setFeedback: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
}

const defaultValue: LikertProgressType = {
    likertProgress: 0,
    setLikertProgress: () => {},
    feedback: '',
    setFeedback: () => {},
    email: '',
    setEmail: () => {},
}

const LikertProgressContext = createContext<LikertProgressType>(defaultValue);

export function useLikertProgressContext() {
    return useContext(LikertProgressContext);
  }

export function LikertProgress({ children } : any) {
    const [likertProgress, setLikertProgress] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');

    return (
        <LikertProgressContext.Provider value={{ likertProgress, setLikertProgress, feedback, setFeedback, email, setEmail }}>
            {children}
        </LikertProgressContext.Provider>            
    )
}