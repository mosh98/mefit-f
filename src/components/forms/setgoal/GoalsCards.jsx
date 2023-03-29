import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useState } from 'react';




function GoalsCards() {
  const [selectedValue, setSelectedValue] = React.useState('1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [goals, setGoals] = useState( [
    { 
      id:1,
      name: "Build",
      description: "Build up the muscle volume to look pumped!",
    },
    {
      id:2,
      name: "Loose",
      description: "XXXBuild up the muscle volume to look pumped!",
    },
    { 
      id:3,
      name: "Strength",
      description: "AAAABuild up the muscle volume to look pumped!",
    },
    { 
      id:4,
      name: "Flexibility",
      description: "BBBBBBBuild up the muscle volume to look pumped!",
    }
  ]
  )


  return (
    
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {goals.map((goal) => (
    <Card sx={{ width: 345, height: 200, margin: '0.5rem' }} key={goal.id}>
      <CardActionArea>

        <CardContent>
        
          <Typography gutterBottom variant="h5" component="div"style={{
        textAlign: 'center'}}>
            {goal.name}
          </Typography>
        
          <Typography variant="body2" color="text.secondary"> 
           {goal.description}
          </Typography>

        </CardContent>

      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <Radio
          
          checked={selectedValue === goal.id.toString()}
          onChange={handleChange}
          value={goal.id.toString()}
          name="radio-buttons"
          inputProps={{ 'aria-label': goal.name }}
        />
        
      </CardActions>
    </Card>
    ))}
    </div>

  );
}

export default GoalsCards;