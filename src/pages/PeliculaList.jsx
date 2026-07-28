import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import PeliculaCard from "../components/PeliculaCard";
import "./PeliculaList.css";
import { getPeliculaList } from "../services/peliculaService";

export default function PeliculaList() {
    const [peliculas, setPeliculas] = useState([]);

    const cargarPeliculas = () => {
        getPeliculaList().then((data) => {
            setPeliculas(data);
        }).catch((error) => {
            console.error("Error obteniendo lista de películas:", error);
        });
    };

    useEffect(() => {
        cargarPeliculas();
    }, []);

    return (
        <Grid container spacing={2}>
            {peliculas.map((pelicula) => (
                <Grid item key={pelicula.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <PeliculaCard pelicula={pelicula} onDelete={cargarPeliculas} />
                </Grid>
            ))}
        </Grid>
    );
}