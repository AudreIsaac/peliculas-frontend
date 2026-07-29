# Catálogo de Películas — Frontend (React + Vite)

Aplicación web para consumir el catálogo de Películas y Directores, con inicio de sesión mediante OAuth 2.0 y operaciones CRUD completas.

## Tecnologías

- React (Vite)
- Material UI (MUI)
- Axios
- React Router DOM

## Funcionalidades

- Inicio de sesión con OAuth 2.0 (Django backend)
- Listado de películas con póster, director, año y género
- Crear, editar y eliminar películas (requiere sesión iniciada)
- Interfaz responsiva con tema oscuro

## Instalación

1. Clonar el repositorio:
```bash
   git clone <URL-de-este-repo>
   cd peliculas-frontend
```

2. Instalar dependencias:
```bash
   npm install
```

3. Crear el archivo `.env` en la raíz con:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_AUTH_BASE_URL=http://localhost:8000/o
VITE_MEDIA_URL=http://localhost:8000/media
VITE_CLIENT_ID=<tu-client-id-de-la-application-oauth2>
```

4. Levantar el servidor de desarrollo:
```bash
   npm run dev
```

   La app estará disponible en `http://localhost:5173`

## Requisito previo

El backend (Django) debe estar corriendo en `http://localhost:8000` con una Application de OAuth2 configurada como **Public** y grant type **Resource owner password-based**.

## Estructura del proyecto

src/

├── components/ # Header, PeliculaCard, PeliculaForm

├── pages/ # PeliculaList, LoginPage

├── services/ # authService (OAuth2), peliculaService (API)

├── theme.js # Tema visual (MUI)


## Autores

- Audrey Piedra
- Jocsan Santana
