import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page');
    if (currentPage) {
      setPage(currentPage);
    }
  }, []);

  if (page === 'admin-login') return <AdminLogin />;
  if (page === 'admin-dashboard') return <AdminDashboard />;

  return (
    <>
      <Home />
    </>
  );
}

export default App;
