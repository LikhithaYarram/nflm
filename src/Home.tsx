import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Modal, TextField, Button, AppBar, Toolbar, Typography, Box, Dialog, DialogTitle, DialogActions, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import nutritionFactsLabel from './assets/nutritionFactsLabel.png';
import LoginIcon from '@mui/icons-material/Login';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

interface NutritionData {
  id: string;
  productTitle: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [savedLabels, setSavedLabels] = useState<NutritionData[]>([]);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('nutritionFactsData') || '[]');
    setSavedLabels(data);
  }, []);

  useEffect(() => {
    // Check for user login status
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
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
          existingId: labelData.id
        }
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleDeleteClick = (event: React.MouseEvent, labelId: string) => {
    event.stopPropagation();
    setLabelToDelete(labelId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (labelToDelete) {
      const allLabels = JSON.parse(localStorage.getItem('nutritionFactsData') || '[]');
      const updatedLabels = allLabels.filter((label: NutritionData) => label.id !== labelToDelete);
      localStorage.setItem('nutritionFactsData', JSON.stringify(updatedLabels));
      setSavedLabels(updatedLabels);
    }
    setDeleteDialogOpen(false);
    setLabelToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setLabelToDelete(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="home">
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#ADD8E6'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.87)',
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontSize: '1.4rem',
              fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif',
              textTransform: 'none',
              padding: '8px 0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)'
            }}
          >
            Nutrition Facts Label Maker
          </Typography>
          
          {user ? (
            <div>
              <IconButton onClick={handleMenuClick} color="inherit">
                <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>{user.username}</MenuItem>
                <MenuItem 
                  onClick={handleLogout} 
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background on hover
                      color: 'red' // Red text on hover
                    }
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button 
              color="inherit" 
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
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
          )}
        </Toolbar>
      </AppBar>
      
      <div className="content" style={{ padding: '32px' }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '32px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            minHeight: '500px'
          }}
        >
          {/* Generate Label Card */}
          <Card 
            onClick={handleAddClick}
            sx={{
              width: 250,
              height: 350,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#ADD8E6',
              '&:hover': { 
                backgroundColor: '#B0DAE9'
              }
            }}
          >
            <img 
              src={nutritionFactsLabel} 
              alt="Nutrition Facts Label"
              style={{
                width: '100%',
                height: '70%',
                objectFit: 'cover',
                objectPosition: 'top',
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
                width: 250,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#ADD8E6',
                position: 'relative',
                '&:hover': { 
                  backgroundColor: '#B0DAE9'
                }
              }}
              onClick={() => handleSavedLabelClick(label.id)}
            >
              <img 
                src={nutritionFactsLabel}
                alt="Nutrition Label"
                style={{
                  width: '100%',
                  height: '70%',
                  objectFit: 'cover',
                  objectPosition: 'top',
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
                  color: 'rgba(0, 0, 0, 0.87)',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                Created: {new Date(label.createdAt).toLocaleDateString()}
              </Typography>
              <Box sx={{ 
                position: 'absolute',
                bottom: 8,
                right: 8
              }}>
                <Button
                  onClick={(e) => handleDeleteClick(e, label.id)}
                  sx={{
                    minWidth: 'auto',
                    padding: '6px',
                  }}
                >
                  <DeleteIcon sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
                </Button>
              </Box>
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
                    borderColor: '#ADD8E6',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ADD8E6',
                },
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleNext}
              disabled={!title.trim()}
              sx={{ 
                mt: 2,
                backgroundColor: '#ADD8E6',
                '&:hover': {
                  backgroundColor: '#B0DAE9'
                },
                '&:disabled': {
                  backgroundColor: '#FFE0B2'
                }
              }}
            >
              Next
            </Button>
          </div>
        </Modal>

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 1 }}>
            <DialogTitle>Are you sure you want to delete this label?</DialogTitle>
            <IconButton onClick={handleDeleteCancel} sx={{ color: 'red',marginTop:'-30px' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button 
              onClick={handleDeleteCancel} 
              sx={{ 
                backgroundColor: '#B0DAE9', 
                color: 'black',
                '&:hover': {
                  backgroundColor: '#ADD8E6'
                }
              }}
            >
              No
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              sx={{ 
                backgroundColor: '#B0DAE9', 
                color: 'black',
                '&:hover': {
                  backgroundColor: '#ADD8E6'
                }
              }} 
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
