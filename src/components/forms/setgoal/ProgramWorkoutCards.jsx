import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { useState } from 'react';




function ProgramWorkoutCards() {
  const [selectedValue, setSelectedValue] = React.useState('1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [picks, setPicks] = useState( [
    { 
      id:1,
      name: "Pick a program",
      description: "Pick a pre-made program to set as your goal for the week",
      button_name: "Pick a program"
    },
    {
      id:2,
      name: "Pick workouts",
      description: "Pick and choose your own workouts to set as your goal",
      button_name: "Pick workouts"
    },

  ]
  )


  return (
    
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {picks.map((pick) => (
    <Card sx={{ width: 400, height: 200, margin: '0.5rem' }} key={pick.id}>
      <CardActionArea>

        <CardContent>
        
          <Typography gutterBottom variant="h5" component="div"style={{
        textAlign: 'center'}}>
            {pick.name}
          </Typography>
        
          <Typography variant="body2" color="text.secondary"> 
           {pick.description}
          </Typography>

        </CardContent>

      </CardActionArea>

      <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
  
          <Button variant="contained"  >{pick.button_name}</Button>
       
      </CardActions>
    </Card>
    ))}
    </div>

  );
}

export default ProgramWorkoutCards;