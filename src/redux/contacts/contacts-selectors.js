export const getItems = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const getVisibleItems = state => {
  const  contacts = getItems(state);
  const filter = getFilter(state);

  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};
