import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLikertProgressContext } from '../../context/likertProgressContext';

const Feedback = () => {
    
    const {email, feedback, setEmail, setFeedback } = useLikertProgressContext()

  return (  
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '20rem' },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        <h3 style={{ margin: 0 }}>
          Any feedback on the experiment are welcomed! (optional)
        </h3>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Your feedback"
            multiline
            rows={4}
            maxRows={6}
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
          '& .MuiTextField-root': { m: 1, width: '20rem' },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        <h3 style={{ margin: 0 }}>
          Email for the results and other experiments (less than 1 per month) (optional)
        </h3>
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
