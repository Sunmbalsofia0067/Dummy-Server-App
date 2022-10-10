import './App.css'
import { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as routes from './constants/routePaths.js'
import UsersList from './pages/UsersList'
import AddUser from './pages/AddUser'

function App () {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={routes.usersPage} element={<UsersList />} />
          <Route path={routes.addUserPage} element={<AddUser />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Fragment>
  )
}
export default App
