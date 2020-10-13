import React from 'react';
import { ThemeProvider } from './contexts/theme.context';
import Init from './Init';
import Nav from './navigation/nav';

// Export
export default function App() {
  return (
    <ThemeProvider>
      <Init />
      <Nav />
    </ThemeProvider>
  );
}
