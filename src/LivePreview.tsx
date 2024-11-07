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
      mainValue: ingredient && ingredient.amount !== undefined ? 
        `${ingredient.amount}${ingredient.unit}` : '--',
      dailyValue: ingredient && ingredient.dailyValue !== undefined ? 
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
          sx={{ bgcolor: '#ADD8E6', color: '#000', '&:hover': { bgcolor: '#B0DAE9' } }}
        >
          Export PDF
        </Button>
        <Button
          variant="contained"
          startIcon={<ImageIcon />}
          onClick={generateJPEG}
          sx={{ bgcolor: '#ADD8E6', color: '#000', '&:hover': { bgcolor: '#B0DAE9' } }}
        >
          Export JPEG
        </Button>
      </Stack>

      {/* Existing preview content - add ref to the Paper component */}
      <Box sx={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
        <Paper ref={previewRef} elevation={0} sx={{ 
          p: '5px',
          border: '3px solid black',
          borderRadius: 0,
          backgroundColor: '#fff',
          fontFamily: 'Helvetica, Arial, sans-serif'
        }}>
          {/* Header */}
          <Typography variant="h6" sx={{ 
            fontWeight: 1000,
            borderBottom: '1px solid #CCCCCC',
            pb: '-15px',
            mt: '-15px',
            mb:'0px',
            // my: '-2px',
            fontSize: '2rem',
            letterSpacing: 0,
            textAlign: 'center'
          }}>
            Nutrition Facts
          </Typography>
          
          {/* Serving Information */}
          <Box sx={{ 
            borderBottom: '10px solid #000',  // Changed from 8px to 10px to make it even bolder
            mb: 0.5 
          }}>
            <Typography sx={{ 
              fontSize: '1rem',
              fontWeight: 400
            }}>
              {servingsPerContainer ? `${servingsPerContainer} servings per container` : 'X servings per container'}
            </Typography>
            
            <Typography sx={{ 
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              mb: 0.5,
              fontWeight: 900  // Changed from 400 to 900 to make it bold
            }}>
              <span>Serving size</span>
              <span>{servingSize || '--'}</span>
            </Typography>
          </Box>

          {/* Amount per serving */}
          <Typography sx={{ 
            fontSize: '0.85rem',
            fontWeight: 900,
            mb: 0
          }}>
            Amount per serving
          </Typography>
          
          {/* Calories */}
          <Box sx={{ 
            borderBottom: '6px solid #000',
            mt:'-25px',
            mb: 0.5,
            pt: 0,
            pb: 0.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}>
            <Typography sx={{ 
              fontSize: '1.8rem',
              fontWeight: 900  // Bolder weight
            }}>
              Calories
            </Typography>
            <Typography sx={{ 
              fontSize: '2.5rem',
              fontWeight: 900
            }}>
              {calories || '0'}
            </Typography>
          </Box>

          {/* % Daily Value text */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mb: 0.5,
            borderBottom: '1px solid #000'
          }}>
            <Typography sx={{ 
              fontSize: '0.85rem',
              fontWeight: 900  // Changed to bold
            }}>
              % Daily Value*
            </Typography>
          </Box>

          {/* Ingredients sections */}
          <Box sx={{ mb: 1 }}>
            {mandatoryIngredientLabels.map((label, index) => {
              const values = getIngredientValues(label);
              const isLastMandatory = index === mandatoryIngredientLabels.length - 1 && additionalIngredients.length === 0;
              return (
                <Box key={`mandatory-${index}`} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  py: 0.25,
                  borderBottom: isLastMandatory ? 'none' : isProtein(label) ? 
                    '10px solid #000' : 
                    ['Total Fat', 'Trans Fat', 'Total Carbohydrate', 'Total Sugars'].includes(label) ?
                    '2px solid #CCCCCC' :  // Changed to 2px for specified labels
                    '1px solid #000'
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    gap: 0.5,
                    flex: 1
                  }}>
                    <Typography sx={{ 
                      fontSize: '0.85rem',
                      fontWeight: label === 'Total Fat' || 
                                 label === 'Total Carbohydrate' || 
                                 label === 'Cholesterol' || 
                                 label === 'Protein' || 
                                 label === 'Sodium' ? 900 : 400,
                      pl: label === 'Added Sugars' ? 4 : 
                          ['Saturated Fat', 'Trans Fat', 'Dietary Fiber', 'Total Sugars'].includes(label) ? 2 : 0
                    }}>
                      {label === 'Added Sugars' ? `Includes ${label}` : label}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: '0.85rem',
                      fontWeight: 400  // Ensure quantity and unit are not bold
                    }}>
                      {values.mainValue}
                    </Typography>
                  </Box>
                  <Typography sx={{ 
                    fontSize: '0.85rem',
                    minWidth: '45px',
                    textAlign: 'right',
                    fontWeight: 900  // Changed to bold for percentage values
                  }}>
                    {values.dailyValue}
                  </Typography>
                </Box>
              );
            })}

            {/* Additional Ingredients Section */}
            {additionalIngredients.length > 0 && (
              <Box>
                {additionalIngredients.map((ingredient, index) => {
                  const isLastAdditional = index === additionalIngredients.length - 1;
                  return (
                    <Box key={`additional-${index}`} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      py: 0.25,
                      borderBottom: isLastAdditional ? 'none' : '1px solid #000'
                    }}>
                      <Box sx={{ 
                        display: 'flex',
                        gap: 0.5,
                        flex: 1
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.85rem',
                          fontWeight: 400  // Match the weight used for non-bold mandatory ingredients
                        }}>
                          {ingredient.name}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '0.85rem',
                          fontWeight: 400  // Match the weight used for non-bold mandatory ingredients
                        }}>
                          {`${ingredient.dosage}${ingredient.unit}`}
                        </Typography>
                      </Box>
                      <Typography sx={{ 
                        fontSize: '0.85rem',
                        minWidth: '45px',
                        textAlign: 'right',
                        fontWeight: 900  // Match the bold weight used for percentage values in mandatory ingredients
                      }}>
                        {`${ingredient.dailyValue}%`}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* FDA Footnote */}
          <Box sx={{ 
            borderTop: '5px solid #000',  // Thinner border
            fontSize: '0.75rem',
            color: '#000'  // Changed to black
          }}>
            <Typography sx={{
              fontSize: '0.70rem',  // Decreased font size
              fontWeight: 400,
              textAlign: 'justify',  // Justify the text
              fontFamily: 'Helvetica, Arial, sans-serif'  // Set font family to Helvetica
            }}>
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LivePreview;
