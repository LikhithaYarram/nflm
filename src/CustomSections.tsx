import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

interface Section {
  title: string;
  content: string;
  marginTop?: string;
}

const CustomSections: React.FC = () => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionContent, setSectionContent] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false);

  useEffect(() => {
    setIsAddButtonEnabled(sectionTitle.trim() !== '' && sectionContent.trim() !== '');
  }, [sectionTitle, sectionContent]);

  const handleAddSection = () => {
    if (sectionTitle && sectionContent) {
      const newSection: Section = { title: sectionTitle, content: sectionContent };
      if (editIndex !== null) {
        const updatedSections = [...sections];
        updatedSections[editIndex] = newSection;
        setSections(updatedSections);
        setEditIndex(null);
      } else {
        setSections([...sections, newSection]);
      }
      setSectionTitle('');
      setSectionContent('');
    }
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleEditSection = (index: number) => {
    setEditIndex(index);
    setSectionTitle(sections[index].title);
    setSectionContent(sections[index].content);
  };

  return (
    <>
      <Typography variant="h6" align="left" gutterBottom>
        Add Sections
      </Typography>
      <Grid container spacing={2} style={{ marginLeft: '0', marginRight: 'auto' }}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                label={<strong>Section Title</strong>}
                variant="outlined"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={<strong>Section Content</strong>}
                variant="outlined"
                value={sectionContent}
                onChange={(e) => setSectionContent(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                onClick={handleAddSection}
                size="large"
                disabled={!isAddButtonEnabled}
              >
                {editIndex !== null ? <SaveIcon /> : <AddIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {sections.map((section, index) => (
            <Grid container key={index} alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={10}>
                <Box sx={{ wordBreak: 'break-word', paddingRight: '16px' }}>
                  <Typography variant="body1">
                    <strong>{section.title}:</strong> {section.content}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleEditSection(index)}
                  size="medium"
                >
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveSection(index)}
                  size="medium"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CustomSections;
