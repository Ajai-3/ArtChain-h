import React from 'react';
import { Suspense } from 'react';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/user/UserRoutes';
import PageFallback from './components/PageFallback';
import AdminRoutes from './routes/admin/AdminRoutes';

const App: React.FC = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Render User Routes */}
        {UserRoutes}
        
        {/* Render Admin Routes */}
        {AdminRoutes}
        
        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;