import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add this line

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://elmapa.cedn.mx/api/token/', {
        username: username,
        password: password,
      });

      const authToken = response.data.token;

      // Solicita un token JWT a /token/ con username y password
    const jwtResponse = await axios.post('https://elmapa.cedn.mx/token/', {
      username: username,
      password: password
    });

    const jwtToken = jwtResponse.data.access;


      // Save the token in localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('username', username);
      localStorage.setItem('jwtToken', jwtToken);



      onLogin(authToken,username);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Inicio de sesión inválido. Por favor, inténtelo de nuevo.'); 
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }

  return (
    <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
        <h2 className="text-center">Iniciar sesión</h2>
          {errorMessage && <p>{errorMessage}</p>} 
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
            <label>Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
            </div>
          
          </form>
        </div>
      </div>
  );
};

export default Login;