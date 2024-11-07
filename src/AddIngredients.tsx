import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Grid,
    IconButton,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Ingredient {
    name: string;
    dosage: string;
    unit: string;
    dailyValue: string;
}

interface AddIngredientsProps {
    onIngredientsChange: (ingredients: Ingredient[]) => void;
    initialIngredients: Ingredient[];
}

const AddIngredients: React.FC<AddIngredientsProps> = ({ onIngredientsChange, initialIngredients }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        name: '',
        dosage: '',
        unit: 'mg',
        dailyValue: ''
    });

    const handleNewIngredientChange = (field: keyof Ingredient, value: string) => {
        setNewIngredient(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddIngredient = () => {
        if (newIngredient.name && newIngredient.dosage) {
            const updatedIngredients = [...ingredients, newIngredient];
            setIngredients(updatedIngredients);
            onIngredientsChange(updatedIngredients);
            setNewIngredient({
                name: '',
                dosage: '',
                unit: 'mg',
                dailyValue: ''
            });
        }
    };

    const handleDeleteIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
        onIngredientsChange(updatedIngredients);
    };

    const handleEditIngredient = (index: number, field: keyof Ingredient, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value
        };
        setIngredients(updatedIngredients);
        onIngredientsChange(updatedIngredients);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Additional Ingredients
            </Typography>
            
            {/* Add new ingredient form */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <TextField
                        label="Ingredient Name"
                        fullWidth
                        size="small"
                        value={newIngredient.name}
                        onChange={(e) => handleNewIngredientChange('name', e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Dosage"
                        fullWidth
                        size="small"
                        value={newIngredient.dosage}
                        onChange={(e) => handleNewIngredientChange('dosage', e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Select
                        fullWidth
                        size="small"
                        value={newIngredient.unit}
                        onChange={(e) => handleNewIngredientChange('unit', e.target.value)}
                    >
                        <MenuItem value="mg">mg</MenuItem>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="mcg">mcg</MenuItem>
                        <MenuItem value="IU">IU</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={2.5}>
                    <TextField
                        label="% Daily Value"
                        fullWidth
                        size="small"
                        type="number"
                        inputProps={{ min: 0, max: 100 }}
                        value={newIngredient.dailyValue}
                        onChange={(e) => handleNewIngredientChange('dailyValue', e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <Button
                        variant="contained"
                        onClick={handleAddIngredient}
                        disabled={!newIngredient.name || !newIngredient.dosage}
                        fullWidth
                        size="small"
                        sx={{
                            backgroundColor: '#ADD8E6',
                            color: '#000000',
                            '&:hover': {
                                backgroundColor: '#B0DAE9' // slightly darker shade for hover
                            }
                        }}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>

            {/* List of added ingredients */}
            {ingredients.map((ingredient, index) => (
                <Grid container spacing={2} alignItems="center" key={index} sx={{ mt: 2 }}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            size="small"
                            value={ingredient.name}
                            onChange={(e) => handleEditIngredient(index, 'name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            size="small"
                            value={ingredient.dosage}
                            onChange={(e) => handleEditIngredient(index, 'dosage', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            fullWidth
                            size="small"
                            value={ingredient.unit}
                            onChange={(e) => handleEditIngredient(index, 'unit', e.target.value)}
                        >
                            <MenuItem value="mg">mg</MenuItem>
                            <MenuItem value="g">g</MenuItem>
                            <MenuItem value="mcg">mcg</MenuItem>
                            <MenuItem value="IU">IU</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={2.5}>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            inputProps={{ min: 0, max: 100 }}
                            value={ingredient.dailyValue}
                            onChange={(e) => handleEditIngredient(index, 'dailyValue', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton 
                            onClick={() => handleDeleteIngredient(index)} 
                            color="error"
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default AddIngredients;
