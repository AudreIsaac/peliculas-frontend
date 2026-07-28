import { Container, AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { isLoggedIn, logout } from "../services/authService";
import "./Header.css";

export default function Header() {
    const handleLogout = async () => {
        await logout();
        alert("Sesión cerrada correctamente.");
        window.location.href = "/";
    }

    return (
        <header className="peliculas-header">
            <AppBar position="static">
                <Container>
                    <Toolbar className="header-title-toolbar">
                        <Typography variant="h3" className="header-title">
                            Catálogo de Películas
                        </Typography>
                    </Toolbar>
                    <Toolbar className="header-nav-toolbar">
                        <Box className="header-nav">
                            <Button color="inherit" href="/">
                                Inicio
                            </Button>
                            {isLoggedIn() && (
                                <>
                                    <Button color="secondary" variant="outlined" href="/add">
                                        + Nueva Película
                                    </Button>
                                    <Button color="inherit" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </Button>
                                </>
                            )}
                            {!isLoggedIn() && (
                                <Button color="secondary" variant="outlined" href="/login">
                                    Iniciar Sesión
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    )
}