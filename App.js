import React, { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './contexts/theme.context';
import Nav from './navigation/nav';

// Export
export default function App() {
  return (
    <ThemeProvider>
      <Nav />
    </ThemeProvider>
  );
}
