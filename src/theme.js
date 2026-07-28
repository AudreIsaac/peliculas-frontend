import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#e50914', // rojo estilo Netflix
        },
        secondary: {
            main: '#f5c518', // dorado sutil para detalles
        },
        background: {
            default: '#141414',
            paper: '#1f1f1f',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    },
    typography: {
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 600 },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#141414',
                    boxShadow: 'none',
                    borderBottom: '1px solid #2c2c2c',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1f1f1f',
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export default theme;