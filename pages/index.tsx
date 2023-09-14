import Instruction from './tasks/instruction'
import Instruction2 from './tasks/instruction_2';
import {SetStateAction, useEffect, useState } from 'react'
import Task from './tasks/task'
import { useCheckboxContext } from '../context/checkboxcontext';
import Experience from './tasks/experience';
import { useLikertProgressContext } from '../context/likertProgressContext'; 
import styles from '../styles/Home.module.scss'
import TextField from '@mui/material/TextField';

type Data = {
  task: string;
  coordinates: any;
  likert: { [key: number]: number };
  email?: string;
  feedback?: string;
};


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
    if(taskComplete) {
      let data : Data = {
        task: "Task description",
        coordinates: responsData,
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
        fetch('/api/user_data', options)
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
  console.log(isChecked)
  function sendUserEmail() {
    let data : any = {
      email: userEmail,
      update: isChecked,
    };
    
    let options = {
      method :'POST',
      headers : {'Content-type' :'application/json'},
      body : JSON.stringify(data),
    }
    fetch('/api/user_email', options)
    .then(res => res.json())
    .catch(err => console.log(err))
  }


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
            transform: 'translate(14px, -50%)',  // Center the label vertically in its default state
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -20px) scale(0.75)',  // Adjust for the shrunk label position and size
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
      <button className={styles.button} onClick={sendUserEmail}>
        <p>
          Send
        </p>
      </button> 
     </div>
    );
  }
  
  return (  
    <div>
    {
      instructionProgress < 4 ? 
        <Instruction progress={instructionProgress} setProgress={setInstructionProgress} />
      : instructionProgress == 4 && currentTask < 8 ? 
        <Task currentTask={currentTask} setResponse={setResponseData} response={responsData}
         onComplete={handleTaskComplete} setTaskComplete={setTaskComplete}/>
      : taskComplete && instructionProgress == 4 ? 
        <Instruction2 progress={instructionProgress} setProgress={setInstructionProgress}/>
      : instructionProgress == 5 ? 
        <Experience/>
      : null
    }
  </div>
  )
}

