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
            
            console.log('Datos recibidos de la API:', data); // Log para ver la estructura
      
            // Verifica si es un array o si está dentro de una propiedad
            if (Array.isArray(data)) {
              setStore({ contacts: data });
            } else if (data.contacts) {
              // Si los contactos están dentro de una propiedad
              setStore({ contacts: data.contacts });
            } else {
              console.error('Error: La API no devolvió un array ni una propiedad contacts');
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
      updateContact: async (contactId, updatedContact) => {
    try {
        const response = await fetch(`${API_URL}/${contactId}`, {
            method: 'PUT', // O 'PATCH' dependiendo de cómo quieras implementar la actualización
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedContact)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al actualizar el contacto:', errorData.detail);
        } else {
            getActions().getContacts(); // Refresca la lista de contactos
        }
    } catch (error) {
        console.error('Error al actualizar el contacto:', error);
    }
},
      createContact: async (newContact) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContact)  // Asegúrate de que se envíe el objeto correcto
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al crear el contacto:', errorData.detail || errorData.message);
            } else {
                getActions().getContacts(); // Refresca la lista de contactos
            }
        } catch (error) {
            console.error('Error al crear el contacto:', error);
        }
    }
    }
  };
};

export default getState;