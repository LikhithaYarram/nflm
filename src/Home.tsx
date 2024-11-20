import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Modal, Button, Box, Dialog, DialogTitle, DialogActions, IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import nutritionFactsLabel from './assets/nutritionFactsLabel.png';
import LoginIcon from '@mui/icons-material/Login';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import undraw from './assets/undraw.svg';
import Label from './assets/Label.jpg';
import Navbar from './Navbar';

interface NutritionData {
  id: string;
  productTitle: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedLabels, setSavedLabels] = useState<NutritionData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<string | null>(null);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [showCreateLabelModal, setShowCreateLabelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('nutritionFactsData') || '[]');
    setSavedLabels(data);
  }, []);

  const handleAddClick = () => {
    setShowCreateLabelModal(true);
  };

  const handleModalClose = () => {
    setShowCreateLabelModal(false);
  };

  const handleCreateLabel = () => {
    setShowCreateLabelModal(false);
    navigate('/create-label', {
      state: { productTitle: 'New Label' }
    });
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

  return (
    <div className="home" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <Drawer
          variant="permanent"
          onMouseEnter={() => setIsDrawerExpanded(true)}
          onMouseLeave={() => setIsDrawerExpanded(false)}
          sx={{
            width: isDrawerExpanded ? 240 : 64,
            transition: 'width 0.2s ease-in-out',
            '& .MuiDrawer-paper': {
              width: isDrawerExpanded ? 240 : 64,
              boxSizing: 'border-box',
              background: 'linear-gradient(to right, #F0F8FF, #B0DAE9)',
              marginTop: '64px',
              height: 'calc(100% - 64px)',
              position: 'fixed',
              overflowX: 'hidden',
              overflowY: 'hidden',
              transition: 'width 0.2s ease-in-out',
              whiteSpace: 'nowrap',
            },
          }}
        >
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <List>
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: isDrawerExpanded ? 1 : 0, transition: 'opacity 0.2s' }} />
              </ListItem>
              <ListItem sx={{ cursor: 'pointer' }} onClick={handleAddClick}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Create Label" sx={{ opacity: isDrawerExpanded ? 1 : 0, transition: 'opacity 0.2s' }} />
              </ListItem>
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => navigate('/audit-logs')}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Audit Logs" sx={{ opacity: isDrawerExpanded ? 1 : 0, transition: 'opacity 0.2s' }} />
              </ListItem>
            </List>

            <Box sx={{ flexGrow: 1 }} />
            
            <List>
              <ListItem sx={{ cursor: 'pointer' }} onClick={() => navigate('/contact')}>
                <ListItemIcon>
                  <ContactSupportIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" sx={{ opacity: isDrawerExpanded ? 1 : 0, transition: 'opacity 0.2s' }} />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <div className="content" style={{ 
          padding: '32px', 
          flexGrow: 1, 
          marginLeft: '10px',
          width: `calc(100% - ${isDrawerExpanded ? 240 : 64}px)`,
          transition: 'width 0.2s ease-in-out'
        }}>
          <Box 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '95%',
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              minHeight: '500px'
            }}
          >
            {savedLabels.length === 0 ? (
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src={undraw}
                  alt="Create new label"
                  style={{ 
                    width: '200px',
                    marginBottom: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={handleAddClick}
                />
                <Typography variant="h5">
                 Click on the image above to create a new label
                </Typography>
              </Box>
            ) : (
              /* Saved Labels */
              savedLabels.map((label) => (
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
              ))
            )}
          </Box>

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

          {/* Create Label Modal */}
          <Dialog
            open={showCreateLabelModal}
            onClose={handleModalClose}
            maxWidth="md"
          >
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <img
                src={Label}
                alt="Create Label"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto'
                }}
              />
              <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
                <Button
                  onClick={handleModalClose}
                  sx={{
                    backgroundColor: '#B0DAE9',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#ADD8E6'
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateLabel}
                  sx={{
                    backgroundColor: '#B0DAE9',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#ADD8E6'
                    }
                  }}
                  autoFocus
                >
                  Create Label
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Home;
