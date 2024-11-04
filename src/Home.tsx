import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Modal, TextField, Button, AppBar, Toolbar, Typography, CardMedia, CardContent, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import nutritionFactsLabel from './assets/nutritionFactsLabel.png';
import createLabel from './assets/createLabel.jpg';
import LoginIcon from '@mui/icons-material/Login';

interface NutritionData {
  id: string;
  productTitle: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [savedLabels, setSavedLabels] = useState<NutritionData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('nutritionFactsData') || '[]');
    setSavedLabels(data);
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (title.trim()) {
      navigate('/create-label', { 
        state: { productTitle: title }
      });
    }
  };

  const handleSavedLabelClick = (labelId: string) => {
    const allLabels = JSON.parse(localStorage.getItem('nutritionFactsData') || '[]');
    const labelData = allLabels.find((label: any) => label.id === labelId);
    
    if (labelData) {
      navigate('/view-label', {
        state: {
          productTitle: labelData.productTitle,
          mandatorySections: labelData.mandatorySections,
          mandatoryIngredients: labelData.mandatoryIngredients,
        additionalIngredients: labelData.additionalIngredients,
          existingId:labelData.id
        }
      });
    }
  };

  const handleCardClick = (nutritionData: any) => {
    navigate('/customize', {
      state: {
        productTitle: nutritionData.productTitle,
        mandatorySections: nutritionData.mandatorySections,
        mandatoryIngredients: nutritionData.mandatoryIngredients,
        additionalIngredients: nutritionData.additionalIngredients,
        existingId: nutritionData.id
      }
    });
  };

  return (
    <div className="home">
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#FFB74D' // This is a light orange color
          // Alternative options:
          // backgroundColor: '#FFCC80' // Even lighter orange
          // backgroundColor: '#FFA726' // Slightly darker orange
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.87)', // Rich black with slight transparency for elegance
              fontWeight: 700, // Changed from 500 to 700 for bolder text
              letterSpacing: '0.5px', // Subtle letter spacing for sophistication
              fontSize: '1.4rem', // Slightly larger font size
              fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif', // Updated font family
              textTransform: 'none', // Ensures natural case
              padding: '8px 0', // Add some vertical padding
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)' // Added subtle shadow
              // Alternative shadow options:
              // textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' // Lighter shadow
              // textShadow: '3px 3px 6px rgba(0, 0, 0, 0.1)' // Softer, more spread out shadow
            }}
          >
            Nutrition Facts Label Maker
          </Typography>
          
          <Button 
            color="inherit" 
            startIcon={<LoginIcon />}
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              },
              position: 'absolute',
              right: 16
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      
      <div className="content" style={{ padding: '32px' }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            justifyContent: 'flex-start',
            width: '100%',
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '32px',
            backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
            minHeight:'500px'
          }}
        >
          {/* Generate Label Card */}
          <Card 
            onClick={handleAddClick}
            sx={{
              width: 300,
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#FFB74D',
              '&:hover': { 
                backgroundColor: '#FFA726'
              }
            }}
          >
            <img 
              src={createLabel} 
              alt="Nutrition Facts Label"
              style={{
                width: '100%',
                height: '60%',
                objectFit: 'cover',
                maxWidth: '100%'
              }}
            />
            <Typography
              sx={{
                color: 'rgba(0, 0, 0, 0.87)',
                fontSize: '1.2rem',
                fontWeight: 500,
                my: 1,
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              Generate Label
            </Typography>
            <AddIcon 
              sx={{ 
                fontSize: 40,
                color: 'rgba(0, 0, 0, 0.87)',
                height: '20%',
                display: 'flex',
                alignItems: 'center'
              }} 
            />
          </Card>

          {/* Saved Labels */}
          {savedLabels.map((label) => (
            <Card
              key={label.id}
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#FFB74D',
                '&:hover': { 
                  backgroundColor: '#FFA726'
                }
              }}
              onClick={() => handleSavedLabelClick(label.id)}
            >
              <img 
                src={createLabel}
                alt="Nutrition Label"
                style={{
                  width: '100%',
                  height: '60%',
                  objectFit: 'cover',
                  maxWidth: '100%'
                }}
              />
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  my: 1,
                  textAlign: 'center',
                  px: 2,
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                }}
              >
                {label.productTitle}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 'auto', 
                  mb: 2,
                  color: 'rgba(0, 0, 0, 0.87)'
                }}
              >
                Created: {new Date(label.createdAt).toLocaleDateString()}
              </Typography>
            </Card>
          ))}
        </Box>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <TextField
              fullWidth
              label="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFB74D', // Match toolbar color when focused
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#FFB74D', // Match toolbar color for label when focused
                },
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleNext}
              disabled={!title.trim()}
              sx={{ 
                mt: 2,
                backgroundColor: '#FFB74D',
                '&:hover': {
                  backgroundColor: '#FFA726' // Slightly darker orange for hover
                },
                '&:disabled': {
                  backgroundColor: '#FFE0B2' // Lighter orange when disabled
                }
              }}
            >
              Next
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
