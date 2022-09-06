import { useSelector } from 'react-redux';
import { Contact } from 'components/Contact/Contact';
import { Loader } from 'components/Loader/Loader';
import { useGetContactsQuery } from 'redux/contacts/contacts-api';
import { Typography, Container, Stack } from '@mui/material';

export const ContactList = () => {
  const { data: contacts, isFetching, isLoading } = useGetContactsQuery();

  const filter = useSelector(state => state.filter);

  const normalizedFilter = filter.toLowerCase();

  const filteredItems = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  if (!contacts) {
    return null;
  }

  console.log(filteredItems);

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <Container>
        <Typography variant="h4" component="h2" mb={2}>
          Contacts
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
          {filteredItems.map(({ id, name, number }) => {
            return <Contact key={id} id={id} name={name} number={number} />;
          })}
        </Stack>
      </Container>
    </>
  );
};
