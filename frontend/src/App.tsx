import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { client } from './apollo/client';
import DepartmentView from './pages/DepartmentView';
import DepartmentEdit from './pages/DepartmentEdit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DepartmentView />} />
            <Route path="/edit" element={<DepartmentEdit />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
