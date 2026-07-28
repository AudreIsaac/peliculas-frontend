import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deletePelicula } from "../services/peliculaService";
import { isLoggedIn } from "../services/authService";
import "./PeliculaCard.css";

export default function PeliculaCard({ pelicula, onDelete }) {
    const navigate = useNavigate();
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    const loggedIn = isLoggedIn();

    const posterUrl = pelicula.poster
        ? (pelicula.poster.startsWith("http") ? pelicula.poster : `${mediaUrl}/${pelicula.poster}`)
        : null;

    const handleDelete = async () => {
        if (!window.confirm(`¿Eliminar "${pelicula.titulo}"?`)) return;
        try {
            await deletePelicula(pelicula.id);
            if (onDelete) onDelete();
        } catch (error) {
            console.error("Error al eliminar la película:", error);
            alert("Error al eliminar la película.");
        }
    };

    return (
        <Card className="pelicula-card">
            <Box className="pelicula-card__poster-wrapper">
                {posterUrl ? (
                    <CardMedia
                        component="img"
                        image={posterUrl}
                        alt={pelicula.titulo}
                        className="pelicula-card__poster"
                    />
                ) : (
                    <Box className="pelicula-card__poster pelicula-card__poster--placeholder">
                        <Typography variant="body2" color="text.secondary">
                            Sin póster
                        </Typography>
                    </Box>
                )}
                <Box className="pelicula-card__overlay">
                    <Typography variant="h6" className="pelicula-card__title">
                        {pelicula.titulo}
                    </Typography>
                    <Typography variant="body2" className="pelicula-card__meta">
                        {pelicula.anio_estreno} · {pelicula.genero}
                        {pelicula.duracion_minutos ? ` · ${pelicula.duracion_minutos} min` : ''}
                    </Typography>
                </Box>
            </Box>
            {loggedIn && (
                <CardActions className="pelicula-card__actions">
                    <Button size="small" color="secondary" onClick={() => navigate(`/edit/${pelicula.id}`)}>
                        Editar
                    </Button>
                    <Button size="small" color="error" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}