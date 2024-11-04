import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl, Typography } from '@mui/material';

interface MandatorySectionsData {
  servingsPerContainer: string;
  servingSize: string;
  calories: string;
}

interface MandatorySectionsProps {
  onDataChange: (data: MandatorySectionsData) => void;
  initialData: MandatorySectionsData;
}

const MandatorySections: React.FC<MandatorySectionsProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {
      ...formData,
      [field]: event.target.value
    };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <Grid container spacing={2} style={{ marginLeft: '0', marginRight: 'auto', paddingTop: '20px' }}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small">
          <Typography variant="body2" component="label" noWrap>
            Servings per container
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={formData.servingsPerContainer}
            onChange={handleChange('servingsPerContainer')}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small">
          <Typography variant="body2" component="label" noWrap>
            Serving size
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={formData.servingSize}
            onChange={handleChange('servingSize')}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small">
          <Typography variant="body2" component="label" noWrap>
            Calories
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            value={formData.calories}
            onChange={handleChange('calories')}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default MandatorySections;
