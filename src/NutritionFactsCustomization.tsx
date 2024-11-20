import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, Button, IconButton, TextField, Grid, FormControl } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import MandatorySections from './MandatorySections';
import MandatoryIngredients from './MandatoryIngredients';
import AddIngredients from './AddIngredients';
import CustomSections from './CustomSections';
import LivePreview from './LivePreview';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';

interface MandatorySectionsData {
  servingsPerContainer: string;
  servingSize: string;
  calories: string;
}

// Updated interface for MandatoryIngredient
interface MandatoryIngredient {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number;
}

// Updated interface for AdditionalIngredient
interface AdditionalIngredient {
  name: string;
  dosage: string;
  unit: string;
  dailyValue: string;
}

const defaultMandatoryIngredients: MandatoryIngredient[] = [
  { name: 'Total Fat', amount: 8, unit: 'g', dailyValue: 10 },
  { name: 'Saturated Fat', amount: 1, unit: 'g', dailyValue: 5 },
  { name: 'Trans Fat', amount: 0, unit: 'g', dailyValue: 0 },
  { name: 'Cholesterol', amount: 0, unit: 'mg', dailyValue: 0 },
  { name: 'Sodium', amount: 160, unit: 'mg', dailyValue: 7 },
  { name: 'Total Carbohydrate', amount: 37, unit: 'g', dailyValue: 13 },
  { name: 'Dietary Fiber', amount: 4, unit: 'g', dailyValue: 14 },
  { name: 'Total Sugars', amount: 12, unit: 'g', dailyValue: 0 },
  { name: 'Added Sugars', amount: 10, unit: 'g', dailyValue: 20 },
  { name: 'Protein', amount: 3, unit: 'g', dailyValue: 0 },
  { name: 'Vitamin D', amount: 2, unit: 'mcg', dailyValue: 10 },
  { name: 'Calcium', amount: 260, unit: 'mg', dailyValue: 20 },
  { name: 'Iron', amount: 8, unit: 'mg', dailyValue: 45 },
  { name: 'Potassium', amount: 240, unit: 'mg', dailyValue: 6 },
];

const NutritionFactsCustomization: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Update the location.state type to include all necessary data
  const { 
    productTitle: initialProductTitle, 
    mandatorySections, 
    mandatoryIngredients: existingMandatoryIngredients,
    additionalIngredients: existingAdditionalIngredients,
    existingId
  } = location.state as { 
    productTitle: string;
    mandatorySections?: MandatorySectionsData;
    mandatoryIngredients?: MandatoryIngredient[];
    additionalIngredients?: AdditionalIngredient[];
    existingId?: string;
  };

  const [productTitle, setProductTitle] = useState(initialProductTitle);

  // Initialize state with existing data if available
  const [mandatorySectionsData, setMandatorySectionsData] = useState<MandatorySectionsData>(
    mandatorySections || {
      servingsPerContainer: '8',
      servingSize: '2/3 cup (55g)',
      calories: '230'
    }
  );

  const [mandatoryIngredients, setMandatoryIngredients] = useState<MandatoryIngredient[]>(
    existingMandatoryIngredients || defaultMandatoryIngredients
  );
  
  const [additionalIngredients, setAdditionalIngredients] = useState<AdditionalIngredient[]>(
    existingAdditionalIngredients || []
  );

  const handleSave = () => {
    const nutritionData = {
      id: existingId || uuidv4(),
      productTitle,
      mandatorySections: mandatorySectionsData,
      mandatoryIngredients,
      additionalIngredients,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('nutritionFactsData') || '[]');
    
    let updatedData;
    if (existingId) {
      updatedData = existingData.map((item: any) => 
        item.id === existingId ? nutritionData : item
      );
    } else {
      updatedData = [...existingData, nutritionData];
    }
    
    localStorage.setItem('nutritionFactsData', JSON.stringify(updatedData));
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Navbar />
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <IconButton
          edge="start"
          sx={{ color: 'black', marginRight: 2 }}
          onClick={() => navigate('/')}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: 'black' }}>
          Back to Home
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Card sx={{ 
          width: '48%', 
          marginTop: 4, 
          marginLeft: 4, 
          paddingRight: '20px', 
          marginRight: 4,
          maxHeight: 'calc(100vh - 120px)', // Increased from -150px
          overflow: 'auto'
        }}>
          <CardContent>
            <Box sx={{ paddingTop: '20px' }}>
              <Grid container spacing={2} style={{ marginLeft: '0', marginRight: 'auto' }}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <Typography variant="body2" component="label" noWrap>
                      Product Title
                    </Typography>
                    <TextField
                      size="small"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <MandatorySections 
              onDataChange={setMandatorySectionsData}
              initialData={mandatorySectionsData}
            />
            
            <Box sx={{ height: '1rem' }} />
            
            <MandatoryIngredients 
              onIngredientsChange={setMandatoryIngredients}
              initialIngredients={mandatoryIngredients}
            />
            <Divider sx={{ my: 2 }} />
            <AddIngredients 
              onIngredientsChange={setAdditionalIngredients}
              initialIngredients={additionalIngredients}
            />
            <Divider sx={{ my: 2 }} />
            <CustomSections />
          </CardContent>
        </Card>
        <Card sx={{ 
          width: '48%', 
          marginTop: 4, 
          marginRight: 4,
          maxHeight: 'calc(100vh - 120px)', // Increased from -150px
          overflow: 'auto'
        }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Live Preview
            </Typography>
            <LivePreview 
              servingsPerContainer={mandatorySectionsData.servingsPerContainer}
              servingSize={mandatorySectionsData.servingSize}
              calories={Number(mandatorySectionsData.calories)}
              mandatoryIngredients={mandatoryIngredients}
              additionalIngredients={additionalIngredients}
            />
          </CardContent>
        </Card>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
          sx={{ 
            minWidth: '200px', 
            backgroundColor: '#ADD8E6', 
            color: 'black',
            '&:hover': { backgroundColor: '#B0DAE9' } 
          }}
        >
          {existingId ? 'Update Nutrition Facts' : 'Save Nutrition Facts'}
        </Button>
      </Box>
    </Box>
  );
};

export default NutritionFactsCustomization;
