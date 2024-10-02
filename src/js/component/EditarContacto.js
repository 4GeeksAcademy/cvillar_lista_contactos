import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const API_URL = 'https://playground.4geeks.com/agendas/christiandvillar/contacts';

const EditarContacto = () => {
  const { id } = useParams();  // Obtener el ID del contacto desde la URL
  const [contact, setContact] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });
  const { actions } = useContext(Context); // Acceso a las acciones de Flux
  const navigate = useNavigate();

  useEffect(() => {
    actions.getContact(id); // Obtiene el contacto a editar
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.updateContact(id, contact);  // Actualiza el contacto en la API
    navigate('/');
  };

  return (
    <div>
      <h1>Editar Contacto</h1>
      {/* Formulario de edición */}
    </div>
  );
};

export default EditarContacto;
