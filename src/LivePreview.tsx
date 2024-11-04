import React, { useRef } from 'react';
import { Box, Paper, Typography, Divider, Button, Stack } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface LivePreviewProps {
  servingsPerContainer?: string;
  servingSize?: string;
  calories?: number;
  mandatoryIngredients?: {
    name: string;
    amount: number;
    unit: string;
    dailyValue: number;
  }[];
  additionalIngredients?: {
    name: string;
    dosage: string;
    unit: string;
    dailyValue: string;
  }[];
  customSections?: {
    title: string;
    content: string;
  }[];
}

// List of all mandatory ingredient labels
const mandatoryIngredientLabels = [
  'Total Fat', 'Saturated Fat', 'Trans Fat', 'Cholesterol', 'Sodium',
  'Total Carbohydrate', 'Dietary Fiber', 'Total Sugars', 'Added Sugars',
  'Protein', 'Vitamin D', 'Calcium', 'Iron', 'Potassium'
];

const LivePreview: React.FC<LivePreviewProps> = ({
  servingsPerContainer,
  servingSize,
  calories,
  mandatoryIngredients = [],
  additionalIngredients = [],
  customSections
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!previewRef.current) return;
    
    const canvas = await html2canvas(previewRef.current, {
      scale: 4,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
      // format: 'a4',
      compress: true
    });
    
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('nutrition-facts.pdf');
  };

  const generateJPEG = async () => {
    if (!previewRef.current) return;
    
    const canvas = await html2canvas(previewRef.current, {
      scale: 4,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = 'nutrition-facts.jpeg';
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/jpeg', 1.0);
  };

  const getIngredientValues = (name: string) => {
    const ingredient = mandatoryIngredients.find(ing => ing.name === name);
    return {
      mainValue: ingredient && ingredient.amount > 0 ? 
        `${ingredient.amount}${ingredient.unit}` : '--',
      dailyValue: ingredient && ingredient.dailyValue > 0 ? 
        `${ingredient.dailyValue}%` : '--'
    };
  };

  // Helper functions to identify different types of ingredients
  const isProtein = (label: string) => label === 'Protein';
  const isVitaminOrMineral = (label: string) => 
    ['Vitamin D', 'Calcium', 'Iron', 'Potassium'].includes(label);

  return (
    <Box>
      {/* Export buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          onClick={generatePDF}
          sx={{ bgcolor: '#FFB74D', color: '#000', '&:hover': { bgcolor: '#FFA726' } }}
        >
          Export PDF
        </Button>
        <Button
          variant="contained"
          startIcon={<ImageIcon />}
          onClick={generateJPEG}
          sx={{ bgcolor: '#FFB74D', color: '#000', '&:hover': { bgcolor: '#FFA726' } }}
        >
          Export JPEG
        </Button>
      </Stack>

      {/* Existing preview content - add ref to the Paper component */}
      <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
        <Paper ref={previewRef} elevation={0} sx={{ 
          p: 2, 
          border: '1px solid #ccc',
          backgroundColor: '#fff' 
        }}>
          {/* Header */}
          <Typography variant="h6" gutterBottom align="center" sx={{ 
            fontWeight: 'bold',
            borderBottom: '1px solid #000',  // Changed from 8px to 1px
            pb: 1,
            fontSize: '2rem',
            letterSpacing: 1
          }}>
            Nutrition Facts
          </Typography>
          
          {/* Serving Information */}
          <Box sx={{ 
            borderBottom: '10px solid #000',  // Changed to thick solid border
            mb: 1 
          }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              mb: 1
            }}>
              {servingsPerContainer ? `${servingsPerContainer} servings per container` : 'X servings per container'}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              mb: 1
            }}>
              <span>Serving size</span>
              <span>{servingSize || '--'}</span>
            </Typography>
          </Box>

          {/* Amount per serving text */}
          <Typography variant="body1" sx={{ 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            mb: 1
          }}>
            Amount per serving
          </Typography>
          
          {/* Calories */}
          <Box sx={{ 
            borderBottom: '6px solid #000',
            mb: 1,
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography sx={{ 
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              Calories
            </Typography>
            <Typography sx={{ 
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              {calories || '0'}
            </Typography>
          </Box>

          {/* % Daily Value text */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mb: 1
          }}>
            <Typography variant="body2" sx={{ 
              fontWeight: 'bold'
            }}>
              % Daily Value*
            </Typography>
          </Box>

          {/* All Ingredients */}
          <Box sx={{ mb: 2 }}>
            {/* Mandatory Ingredients */}
            {mandatoryIngredientLabels.map((label, index) => {
              const values = getIngredientValues(label);
              return (
                <Box key={`mandatory-${index}`} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  py: 0.5,
                  borderBottom: isProtein(label) ? 
                    '10px solid #000' : 
                    (index === mandatoryIngredientLabels.length - 1 && 
                     additionalIngredients.length === 0 ? 
                      'none' : '1px solid #ccc')
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    gap: 1,
                    flex: 1
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: label === 'Total Fat' || 
                                 label === 'Total Carbohydrate' || 
                                 label === 'Protein' ||
                                 label === 'Total Sugars' ? 'bold' : 'normal',
                      pl: !isVitaminOrMineral(label) && 
                          !label.includes('Total') && 
                          !label.includes('Protein') ? 2 : 0
                      // Remove indentation for vitamins and minerals
                    }}>
                      {`${label} ${values.mainValue}`}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    minWidth: '45px',
                    textAlign: 'right',
                    fontWeight: 'bold'
                  }}>
                    {values.dailyValue}
                  </Typography>
                </Box>
              );
            })}

            {/* Additional Ingredients */}
            {additionalIngredients.map((ingredient, index) => (
              <Box key={`additional-${index}`} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                py: 0.5,
                borderBottom: index === additionalIngredients.length - 1 ? 
                             'none' : '1px solid #ccc'
              }}>
                <Typography variant="body2">
                  {`${ingredient.name} ${ingredient.dosage}${ingredient.unit}`}
                </Typography>
                <Typography variant="body2" sx={{ 
                  minWidth: '45px',
                  textAlign: 'right',
                  fontWeight: 'bold'
                }}>
                  {ingredient.dailyValue ? `${ingredient.dailyValue}%` : '--'}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Custom Sections */}
          {customSections && customSections.length > 0 && (
            <Box sx={{ borderTop: '8px solid #000', pt: 1 }}>
              {customSections.map((section, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body2">
                    {section.content}
                  </Typography>
                  {index < customSections.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* FDA Footnote with thick border */}
          <Box sx={{ 
            mt: 3, 
            pt: 2, 
            borderTop: '8px solid #000',
            fontSize: '0.75rem',
            color: '#666'
          }}>
            <Typography variant="caption" display="block" paragraph>
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LivePreview;
