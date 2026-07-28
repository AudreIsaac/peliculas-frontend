import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addPelicula, updatePelicula, getPelicula, getDirectorList } from '../services/peliculaService';
import './PeliculaForm.css';

export default function PeliculaForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [errorMsg, setErrorMsg] = useState('');
    const [directores, setDirectores] = useState([]);
    const [peliculaData, setPeliculaData] = useState({
        titulo: '',
        genero: '',
        anio_estreno: '',
        duracion_minutos: '',
        director: '',
        poster: null,
    });

    useEffect(() => {
        getDirectorList().then(setDirectores).catch(() => setErrorMsg('No se pudieron cargar los directores.'));

        if (isEditing) {
            getPelicula(id).then((data) => {
                setPeliculaData({
                    titulo: data.titulo || '',
                    genero: data.genero || '',
                    anio_estreno: data.anio_estreno || '',
                    duracion_minutos: data.duracion_minutos || '',
                    director: data.director || '',
                    poster: null,
                });
            });
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'poster') {
            setPeliculaData({ ...peliculaData, poster: files[0] });
        } else {
            setPeliculaData({ ...peliculaData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accion = isEditing ? updatePelicula(id, peliculaData) : addPelicula(peliculaData);
        accion.then(() => {
            alert(`Película ${isEditing ? 'actualizada' : 'agregada'} correctamente.`);
            navigate('/');
        }).catch((error) => {
            console.error("Error guardando película:", error);
            setErrorMsg(`Error al ${isEditing ? 'actualizar' : 'agregar'} la película. Verifica los datos.`);
        });
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {isEditing ? 'Editar Película' : 'Agregar Película'}
            </Typography>
            <Box component="form" className="pelicula-form" onSubmit={handleSubmit}>
                <TextField
                    name="titulo"
                    onChange={handleChange}
                    value={peliculaData.titulo}
                    label="Título"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    name="genero"
                    onChange={handleChange}
                    value={peliculaData.genero}
                    label="Género"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    name="anio_estreno"
                    onChange={handleChange}
                    value={peliculaData.anio_estreno}
                    label="Año de estreno"
                    variant="outlined"
                    type="number"
                    fullWidth
                    required
                />
                <TextField
                    name="duracion_minutos"
                    onChange={handleChange}
                    value={peliculaData.duracion_minutos}
                    label="Duración (min)"
                    variant="outlined"
                    type="number"
                    fullWidth
                />
                <TextField
                    name="director"
                    onChange={handleChange}
                    value={peliculaData.director}
                    label="Director"
                    variant="outlined"
                    select
                    fullWidth
                    required
                >
                    {directores.map((d) => (
                        <MenuItem key={d.id} value={d.id}>
                            {d.nombre}
                        </MenuItem>
                    ))}
                </TextField>
                {errorMsg && (
                    <Typography color="error">
                        {errorMsg}
                    </Typography>
                )}
                <label>
                    Póster: <input type="file" accept="image/*" name="poster" onChange={handleChange} />
                </label>
                <Button variant="contained" color="primary" type="submit">
                    {isEditing ? 'Guardar Cambios' : 'Guardar Película'}
                </Button>
            </Box>
        </>
    );
}