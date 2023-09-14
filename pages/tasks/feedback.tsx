import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLikertProgressContext } from '../../context/likertProgressContext';

const Feedback = () => {
    
    const {email, feedback, setEmail, setFeedback } = useLikertProgressContext()

  return (  
    <div style={{ display: 'flex', flexDirection: 'column', position:'relative', top:'100px', left:'10%' }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35rem'},
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
      <h2 style={{ margin: 0, color:'#303030', paddingBottom:'10px', fontWeight:'normal' }}>
        Any feedback on the experiment are welcomed!&nbsp; 
        <span > <i> (optional)</i></span>
      </h2>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Your feedback"
            multiline
            rows={6}
            maxRows={8}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)} // Save feedback to state
            sx={{
              borderRadius: '10px',
              backgroundColor: 'lightblue',
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35rem' },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        <h2 style={{ margin: 0,  color:'#303030', paddingBottom:'10px', marginTop:'30px', fontWeight:'normal'  }}>
          Email for the results and other experiments (less than 1 per month)&nbsp;  
          <span > <i> (optional)</i></span>
        </h2>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Your e-mail address"
            multiline
            maxRows={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Save email to state
            sx={{
              borderRadius: '10px',
              backgroundColor: 'lightblue',
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', 
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default Feedback;
