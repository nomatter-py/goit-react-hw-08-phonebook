import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDeleteContactMutation, useUpdateContactMutation } from 'redux/contacts/contacts-api';
import { toast } from 'react-toastify';
import {
  Typography,
  Button,
  Card,
  TextField,
  Box,
  Avatar,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { CardHeader, CardContent, CardActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Contact = ({ id, name, number }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const handleDelete = async id => {
    await deleteContact(id);
  };

  const handlerUppdate = e => {
    e.preventDefault();

    const form = e.target;

    const updateName = form.elements.name.value;
    const updatedNumber = form.elements.number.value;
    const updatedContact = { name: updateName, number: updatedNumber };

    if (name === updateName) {
      toast.info(name + ' is already in contacts!');
      return;
    }

    updateContact({ id, ...updatedContact }).then(data => {
      if (data.error) {
        toast.error('Failed to edit contact');
      } else {
        toast.success('Contact updated successfully');
        setModalOpen(false);
      }
    });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    let nameParts = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        nameParts.length === 1
          ? `${name[0].toUpperCase()}`
          : `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`,
    };
  }

  return (
    <>
      <Card
        sx={{ paddingLeft: '1rem', marginBottom: '1rem', maxHeight: '10rem', minWidth: '15rem' }}
      >
        <CardContent>
          <CardHeader
            avatar={<Avatar {...stringAvatar(name)} aria-label="recipe" />}
            title={name}
            subheader=<a href={`tel:${number}`}>{number}</a>
          />

          <CardActions disableSpacing>
            {' '}
            <IconButton
              onClick={() => handleDelete(id)}
              aria-label="remove contact"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => handleModalOpen(id)}
              aria-label="remove contact"
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>

      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={{ ...style, width: { xs: '20rem' } } }>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'uppercase'
                }}
              >
                Edit contact
              </Typography>
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', p: 4}}
                onSubmit={handlerUppdate}
              >
                <TextField
                  label="Name"
                  variant="standard"
                  type="text"
                  name="name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  defaultValue={name}
                  required
                />
                <TextField
                  label="Number"
                  variant="standard"
                  type="tel"
                  name="number"
                  pattern={{
                    value:
                      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
                    message:
                      'This must be digits and may contain spaces, dashes, parentheses or start with +.',
                  }}
                  defaultValue={number}
                  required
                />
                <Button sx={{ m: 3 }} variant="outlined" type="submit">
                  Update
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
