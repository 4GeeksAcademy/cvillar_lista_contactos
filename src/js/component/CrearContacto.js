import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const CrearContacto = () => {
  const [contact, setContact] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });
  const { actions } = useContext(Context); // Usa el contexto de Flux para acceder a las acciones
  const navigate = useNavigate();

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Usa la acción de Flux para crear un contacto nuevo
      await actions.createContact(contact); 
      // Redirige a la lista de contactos después de crear el contacto
      navigate('/');
    } catch (error) {
      console.error('Error al crear el contacto:', error);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Contacto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="full_name"
          placeholder="Nombre completo"
          value={contact.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          id="phone"
          placeholder="Teléfono"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="address"
          placeholder="Dirección"
          value={contact.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Contacto</button>
      </form>
    </div>
  );
};

export default CrearContacto;
