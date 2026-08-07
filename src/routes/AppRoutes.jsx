import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Members from "../pages/Members";
import IssueBooks from "../pages/IssueBooks";
import Profile from "../pages/Profile";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";;

function AppRoutes() {

  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }>

        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/issue-books" element={<IssueBooks />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
    
  );
}

export default AppRoutes;