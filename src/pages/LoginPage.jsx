import { Box, Button, TextField, Typography } from '@mui/material';
import { login } from '../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(username, password).then((response) => {
            localStorage.setItem("token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);
            navigate('/');
        }).catch((error) => {
            console.error("Error en login:", error);
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        });
    };

    return (
        <Box component="form" className="login-form" onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                Iniciar Sesión - Catálogo de Películas
            </Typography>
            <TextField
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                variant="outlined"
                fullWidth
                required
            />
            <TextField
                label="Contraseña"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="outlined"
                fullWidth
                required
            />
            {error && (
                <Typography color="error">
                    {error}
                </Typography>
            )}
            <Button variant="contained" color="primary" type="submit">
                Iniciar Sesión
            </Button>
        </Box>
    );
}