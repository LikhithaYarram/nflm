import React, { useState } from 'react';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

interface MandatoryIngredient {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number;
}

interface MandatoryIngredientsProps {
  onIngredientsChange: (ingredients: MandatoryIngredient[]) => void;
  initialIngredients: MandatoryIngredient[];
}

const mandatoryIngredientsList = [
  'Total Fat', 'Saturated Fat', 'Trans Fat', 'Cholesterol', 'Sodium',
  'Total Carbohydrate', 'Dietary Fiber', 'Total Sugars', 'Added Sugars',
  'Protein', 'Vitamin D', 'Calcium', 'Iron', 'Potassium'
];

const units = ['mg', 'g', 'mcg', 'IU'];

const MandatoryIngredients: React.FC<MandatoryIngredientsProps> = ({ onIngredientsChange, initialIngredients }) => {
  const [ingredients, setIngredients] = useState<MandatoryIngredient[]>(
    initialIngredients.length > 0 ? initialIngredients : mandatoryIngredientsList.map(name => ({
      name,
      amount: 0,
      unit: units[0],
      dailyValue: 0
    }))
  );

  const handleChange = (index: number, field: keyof MandatoryIngredient, value: string | number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: field === 'amount' || field === 'dailyValue' ? Number(value) : value
    };
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  return (
    <Grid container spacing={2} style={{ marginLeft: '0', marginRight: 'auto' }}>
      {ingredients.map((ingredient, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body2" component="label">
                {ingredient.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{ min: 0, step: 0.1 }}
                  label="Quantity"
                  value={ingredient.amount || ''}
                  onChange={(e) => handleChange(index, 'amount', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFB74D',
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ '&.Mui-focused': { color: '#FFB74D' } }}>Unit</InputLabel>
                <Select
                  label="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleChange(index, 'unit', e.target.value)}
                  sx={{
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFB74D',
                    },
                  }}
                >
                  {units.map((unit, unitIndex) => (
                    <MenuItem key={unitIndex} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{ min: 0, max: 100 }}
                  label="% Daily Value"
                  value={ingredient.dailyValue || ''}
                  onChange={(e) => handleChange(index, 'dailyValue', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFB74D',
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MandatoryIngredients;