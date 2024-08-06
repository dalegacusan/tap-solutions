import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon

// @ref https://codesandbox.io/s/k260nyxq9v?file=/index.js

const DraggableWidgets = ({ items, onDragEnd, setItems, setFormData }) => {
  const handleDelete = (id) => {
    // Remove the widget from the items
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    // Set the formData property for the deleted widget to an empty string
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: '',
    }));
  };

  return (
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
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.content} />
                    </Box>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleDelete(item.id)}
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
  );
};

export default DraggableWidgets;
