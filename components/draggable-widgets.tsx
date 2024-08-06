import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Modal,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DraggableWidgets = ({ items, onDragEnd, setItems, setFormData }) => {
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: '',
    }));
  };

  const handleWidgetClick = (id, value) => {
    setCurrentWidget(id);
    setCurrentValue(value);
    setSubModalOpen(true);
  };

  const handleSaveSubModal = () => {
    // Update the item in the `items` array
    const updatedItems = items.map((item) =>
      item.id === currentWidget
        ? { ...item, content: currentValue }
        : item
    );
    setItems(updatedItems);

    // Update the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [currentWidget]: currentValue,
    }));
    
    setSubModalOpen(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        margin: '8px 0px',
                        boxShadow: 1,
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between', // Align delete button to the right
                      }}
                      className='card-socials'
                      onClick={() => handleWidgetClick(item.id, item.content)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.content} />
                      </Box>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the click event
                          handleDelete(item.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal for Widget Input */}
      <Modal
        open={subModalOpen}
        onClose={() => setSubModalOpen(false)}
        aria-labelledby='sub-modal-title'
        aria-describedby='sub-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography id='sub-modal-title' variant='h6' component='h2' mb={3}>
            Edit {currentWidget.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <TextField
            fullWidth
            label={currentWidget.replace(/([A-Z])/g, ' $1').trim()}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSaveSubModal}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DraggableWidgets;
