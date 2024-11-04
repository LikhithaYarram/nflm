import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import MandatorySections from './MandatorySections';
import MandatoryIngredients from './MandatoryIngredients';
import AddIngredients from './AddIngredients';
import CustomSections from './CustomSections';
import LivePreview from './LivePreview';
import { v4 as uuidv4 } from 'uuid';

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

const NutritionFactsCustomization: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Update the location.state type to include all necessary data
  const { 
    productTitle, 
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

  // Initialize state with existing data if available
  const [mandatorySectionsData, setMandatorySectionsData] = useState<MandatorySectionsData>(
    mandatorySections || {
      servingsPerContainer: '',
      servingSize: '',
      calories: ''
    }
  );

  const [mandatoryIngredients, setMandatoryIngredients] = useState<MandatoryIngredient[]>(
    existingMandatoryIngredients || []
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
      <AppBar position="static" sx={{ backgroundColor: '#FFB74D' }} elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ color: 'black' }}
            onClick={() => navigate('/')}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, color: 'black' }}>
            Nutrition Facts Label Maker
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Card sx={{ width: '48%', marginTop: 4, marginLeft: 4, paddingRight: '20px', marginRight: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {productTitle}
            </Typography>
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
        <Card sx={{ width: '48%', marginTop: 4, marginRight: 4 }}>
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
            backgroundColor: '#FFB74D', 
            color: 'black',
            '&:hover': { backgroundColor: '#FFA726' } 
          }}
        >
          {existingId ? 'Update Nutrition Facts' : 'Save Nutrition Facts'}
        </Button>
      </Box>
    </Box>
  );
};

export default NutritionFactsCustomization;
