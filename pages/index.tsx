import Instruction from './tasks/instruction'
import Instruction2 from './tasks/instruction_2';
import {SetStateAction, useEffect, useMemo, useState } from 'react'
import Task from './tasks/task'
import { useCheckboxContext } from '../context/checkboxcontext';
import Experience from './tasks/experience';
import { useLikertProgressContext } from '../context/likertProgressContext'; 
import styles from '../styles/Home.module.scss'
import TextField from '@mui/material/TextField';

type Data = {
  task: string;
  response: any;
  likert: { [key: number]: number };
  email?: string;
  feedback?: string;
};

interface DesignState {
  variant: string;
}
 
const url = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_URL_REMOTE : process.env.NEXT_PUBLIC_URL

async function fetchTaskState(): Promise<DesignState> {
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
  };
   
  try {
    const response = await fetch(`${url}/api/task_state`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    const data: DesignState = await response.json();
    console.log("Received Data:", data); 
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);
  const [instructionProgress, setInstructionProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [responsData, setResponseData] = useState({})
  const [taskComplete, setTaskComplete] = useState(false)
  const { likertAnswers} = useCheckboxContext();
  const {likertProgress, feedback, email } = useLikertProgressContext()
  const [userEmail, setUserEmail]  = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [designState, setDesignState] = useState<DesignState | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTaskState();
        setDesignState(data);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, []);
  
  /*useEffect(() => {
    const fetchDesignState = async () => {
      try {
        const data = await toggleTaskState(); // this should now only fetch, not toggle
        console.log("Design State Data:", data);
        setDesignState(data);
      } catch (error) {
        setError(error as Error);
      }
    };
    
    // Only fetch design state once on component mount.
    fetchDesignState();
}, []);*/

  console.log(url)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleTaskComplete = () => {
    setTimeout(() => {
      setCurrentTask((prevTask) => prevTask + 1);
    }, 1000);  
  }
 
  useEffect(() => {
    if(taskComplete && designState) {
      let data : Data = {
        task: designState?.variant, 
        response: responsData,
        likert: likertAnswers
      };
      
      if (email) {
        data.email = email;
      }
       
      if (feedback) { 
        data.feedback = feedback;
      }
      let options = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
      }
      console.log(options)
      if (taskComplete && likertProgress === 5) {
        fetch(`${url}/api/user_data`, options)
          .then(res => {
            console.log(res.status)
            return res.json()
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          });
      }  
    }
  }, [responsData, taskComplete, feedback, email, likertProgress]);

  function handleUserEmail(e: { target: { value: SetStateAction<string>; }; }) {
    setUserEmail(e.target.value)
  }

  function handleChecked() {
    setIsChecked(!isChecked)
  }

  function sendUserEmail() {
    let data : any = {
      email: userEmail,
      update: isChecked,
    };
    setEmailSent(true)
    let options = {
      method :'POST',
      headers : {'Content-type' :'application/json'},
      body : JSON.stringify(data),
    }
    fetch(`${url}/api/user_email`, options)
    .then(res => res.json())
    .catch(err => console.log(err))
  }

  console.log(instructionProgress)
  console.log(currentTask)
  
  if(isMobile) {
    return (
     <div className={styles.mobileTextContainer}>
       <p className={styles.mobileText} style={{textAlign:'left'}}>
        It seems that you are browsing from mobile but the experiment runs <strong>only in desktop.</strong>
      </p>
      <p className={styles.mobileText2} >
        Send link to finish later:
      </p>
      <div className={styles.textField}>
      <TextField
        type="text"
        name=""
        id=""
        onChange={handleUserEmail}
        label="Your e-mail address"
        sx={{
          backgroundColor: 'rgb(229, 239, 246)',
          color: 'black',
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
          '& .MuiOutlinedInput-input': {
            paddingTop: '8px',
            paddingBottom: '8px',
          },
          '& .MuiInputLabel-outlined': {
            top: '50%',
            transform: 'translate(14px, -50%)',  
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -20px) scale(0.75)',  
          },
        }}
      />
      </div>
      <div className={styles.update}>
        <p className={styles.mobileText3}>
          Also subsrcibe to updates about the project.
        </p>
        <input
          style={{marginRight:'20px', width:'50px', height:'50px'}}
          type="checkbox"
          checked={isChecked}
          onChange={handleChecked} 
        />

      </div>
        {emailSent ? 
        <button className={styles.button} style={{backgroundColor:"green"}}>
          <p>
           Address sent!
          </p>
        </button> 
       : 
        <button className={styles.button} onClick={sendUserEmail}>
          <p>
            Send
          </p>
        </button> }
     </div>
    );
  }

  return (  
    <div className={styles.mainContainer}>
    {
      instructionProgress < 10 ? 
        <Instruction progress={instructionProgress} setProgress={setInstructionProgress} />
      : instructionProgress == 10 && currentTask < 12 ? 
        <Task designState={designState} currentTask={currentTask} setResponse={setResponseData} response={responsData}
         onComplete={handleTaskComplete} setTaskComplete={setTaskComplete}/>
      : taskComplete && instructionProgress == 10 ? 
        <Instruction2 progress={instructionProgress} setProgress={setInstructionProgress}/>
      : instructionProgress == 11 ? 
        <Experience/>
      : null
    }
  </div>
  )
}

