import React from "react";
import UserRoutes from "./routes/user/UserRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";

const App: React.FC = () => {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
    </>
  );
};

export default App;
