const API_URL = 'https://playground.4geeks.com/contact/agendas/christiandvillar/contacts';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: []
    },
    actions: {
      getContacts: async () => {
        try {
          const response = await fetch(API_URL);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              setStore({ contacts: data });
            } else {
              console.error('Error: La API no devolvió un array');
              setStore({ contacts: [] });
            }
          } else {
            const errorData = await response.json();
            console.error('Error en la API:', errorData.detail);
          }
        } catch (error) {
          console.error('Error al obtener los contactos:', error);
        }
      },

      createContact: async (newContact) => {
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact)
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al crear el contacto:', errorData.detail);
          } else {
            getActions().getContacts();
          }
        } catch (error) {
          console.error('Error al crear el contacto:', error);
        }
      }
    }
  };
};

export default getState;