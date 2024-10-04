import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../styles/card.css';  // Importa el archivo CSS
import contactImage from '../../img/imagen random.jpeg';  // Importa la imagen

const Listadecontacto = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getContacts(); // Llama a la acción para obtener los contactos al cargar el componente
  }, []);

  return (
    <div className="contact-list">
      <h1>Lista de Contactos</h1>
      <button className="create-button" onClick={() => navigate('/create')}>
        Crear Nuevo Contacto
      </button>
      <div id="contactsList">
        {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
          store.contacts.map(contact => (
            <div className="contact-card" key={contact.id}>
              {/* Imagen del contacto */}
              <img src={contactImage} alt="Contacto" />
              
              {/* Información del contacto */}
              <div className="contact-info">
                <p><strong>{contact.name}</strong></p>
                <p>Email: {contact.email}</p>
                <p>Teléfono: {contact.phone}</p>
                <p>Dirección: {contact.address}</p>
              </div>

              {/* Acciones (Editar y Eliminar) */}
              <div className="contact-actions">
                <button className="edit-button" onClick={() => navigate(`/edit/${contact.id}`)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button" onClick={() => actions.deleteContact(contact.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
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