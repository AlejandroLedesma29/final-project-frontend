
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActivationPage = () => {
  const { activationToken } = useParams();
  const [activationStatus, setActivationStatus] = useState(null);

  useEffect(() => {
    const backendResponse = {
      message: "La cuenta ya está activada"
    };
    setActivationStatus(backendResponse.message === 'La cuenta ya está activada' || backendResponse.message === 'uenta activada correctamente' ? 'alreadyActivated' : 'success');
  }, [activationToken]);

  return (
    <div>
      {activationStatus === 'success' && (
        <div>
          <h1>Cuenta Activada</h1>
          <p>Tu cuenta se ha activado correctamente. ¡Bienvenido!</p>
        </div>
      )}
      {activationStatus === 'alreadyActivated' && (
        <div>
          <h1>Cuenta Ya Activada</h1>
          <p>Tu cuenta ya estaba activada. ¡Gracias por utilizar nuestros servicios!</p>
        </div>
      )}
      {activationStatus === 'error' && (
        <div>
          <h1>Error al Activar la Cuenta</h1>
          <p>Hubo un problema al activar tu cuenta. Por favor, contacta al soporte.</p>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
