import React from 'react'
import './App.css'
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateBooks from './pages/CreateBooks';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import ShowsBook from './pages/ShowsBook';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const [count, setCount] = useState(0)
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path='/'
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path='/books/create'
          element={user ? <CreateBooks /> : <Navigate to="/login" />}
        />
        <Route
          path='/books/details/:id'
          element={user ? <ShowsBook /> : <Navigate to="/login" />}
        />
        <Route
          path='/books/edit/:id'
          element={user ? <EditBook /> : <Navigate to="/login" />}
        />
        <Route
          path='/books/delete/:id'
          element={user ? <DeleteBook /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
