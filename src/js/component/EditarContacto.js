import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const EditarContacto = () => {
  const { id } = useParams();  // Obtener el ID del contacto desde la URL
  const { store, actions } = useContext(Context); // Acceso al store de Flux
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Intentar encontrar el contacto en el estado
    const existingContact = store.contacts.find(contact => contact.id === parseInt(id)); // Asegúrate de comparar correctamente
    if (existingContact) {
      setContact(existingContact); // Rellenar el estado con los datos del contacto
    } else {
      console.error('El contacto no fue encontrado en el estado.');
      // Aquí podrías redirigir o mostrar un mensaje si no se encuentra el contacto
    }
  }, [id, store.contacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.updateContact(id, contact);  // Actualiza el contacto en la API
    navigate('/');  // Redirige a la lista de contactos
  };

  return (
    <div>
      <h1>Editar Contacto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          placeholder="Nombre"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          required
        />
        <input
          type="tel"
          id="phone"
          placeholder="Teléfono"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          required
        />
        <input
          type="text"
          id="address"
          placeholder="Dirección"
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
          required
        />
        <button type="submit">Actualizar Contacto</button>
      </form>
    </div>
  );
};

export default EditarContacto;
