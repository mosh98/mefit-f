import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useState } from 'react';


interface SortTargetAreaProps {
  onUserTargetAreaChange: (targetArea: string) => void;
}

export function SortByTargetArea({ onUserTargetAreaChange }: SortTargetAreaProps) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: { target: { value: any; }; }) => {
    const selectedTargetAreaId= event.target.value;
    const selectedTargetArea = targetAreas.find(
      (targetArea) => targetArea.id.toString() === selectedTargetAreaId);
    onUserTargetAreaChange(selectedTargetArea?.name || '');
    setSelectedValue(selectedTargetAreaId);
  };

  const [targetAreas] = useState( [
    { 
      id:1,
      name: "Chest",
      description: "Build up the muscle volume to look pumped!",
    },
    {
      id:2,
      name: "Back",
      description: "XXXBuild up the muscle volume to look pumped!",
    },
    { 
      id:3,
      name: "Legs",
      description: "AAAABuild up the muscle volume to look pumped!",
    },
    { 
      id:4,
      name: "Shoulders",
      description: "BBBBBBBuild up the muscle volume to look pumped!",
    }
  ]
  )


  return (
    
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {targetAreas.map((targetArea) => (
    <Card sx={{ width: 345, height: 200, margin: '0.5rem' }} key={targetArea.id}>
      <CardActionArea>

        <CardContent>
        
          <Typography gutterBottom variant="h5" component="div"style={{
        textAlign: 'center'}}>
            {targetArea.name}
          </Typography>
        
          <Typography variant="body2" color="text.secondary"> 

          </Typography>

        </CardContent>

      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <Radio
          
          checked={selectedValue === targetArea.id.toString()}
          onChange={handleChange}
          value={targetArea.id.toString()}
          name="radio-buttons"
          inputProps={{ 'aria-label': targetArea.name }}
        />
        
      </CardActions>
    </Card>
    ))}
    </div>

  );
}