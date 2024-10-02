import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Listadecontacto = () => {
  const { store, actions } = useContext(Context); // Obtener store y actions del contexto
  const navigate = useNavigate();

  useEffect(() => {
    actions.getContacts(); // Llama a la acción para obtener los contactos al cargar el componente
  }, []);

  return (
    <div>
      <h1>Lista de Contactos</h1>
      <button onClick={() => navigate('/create')}>Crear Nuevo Contacto</button>
      <div id="contactsList">
        {/* Verifica que contacts es un array antes de usar .map() */}
        {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
          store.contacts.map(contact => (
            <div key={contact.id}>
              <p><strong>{contact.full_name}</strong></p>
              <p>Email: {contact.email}</p>
              <p>Teléfono: {contact.phone}</p>
              <p>Dirección: {contact.address}</p>
              <button onClick={() => navigate(`/edit/${contact.id}`)}>Editar</button>
              <button onClick={() => actions.deleteContact(contact.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay contactos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Listadecontacto;
