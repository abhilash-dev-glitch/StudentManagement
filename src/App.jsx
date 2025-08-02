import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentList from './pages/StudentList';
import StudentDetails from './pages/StudentDetails';
import StudentForm from './pages/StudentForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="students" element={<StudentList />} />
        <Route path="student/:id" element={<StudentDetails />} />
        <Route path="add" element={<StudentForm />} />
        <Route path="edit/:id" element={<StudentForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;