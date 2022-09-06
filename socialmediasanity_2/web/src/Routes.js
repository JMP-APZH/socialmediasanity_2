// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'
import { Navigate, Redirect } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { Feed, UserProfile } from './components'
import Pin from './components/Pin'
import PinDetail from './components/PinDetail'
import Pins from './container/Pins'
import Login2Page from './pages/Login2Page/Login2Page'

const Routes = ({user}) => {

  // const navigate = useNavigate();

  return (
    <Router>
        <Route path="/" page={HomePage} name="home" />
        <Route path='/feed' page={Feed} name="feed" />
        <Route path="/login2" page={Login2Page} name="login2" />
        <Route path="/pin-detail/{id:Int}" page={Pin} name="pindetail" />
        {/* <Route path="/redirect" element={ <Navigate to="/" /> } /> */}
        <Route path="/login" page={LoginPage} name="login" />
        <Route notfound page={NotFoundPage} />

        {/* <Route path='/pin-detail/:pinId' page={<PinDetail user={user} name="pin-detail" />} /> */}

        {/* <Route path="/user-profile/:userId" page={<UserProfile />} name='userprofileid' />
        <Route path="/*" element={<Pins user={user && user} />} name='pins' /> */}

    </Router>
  )
}

export default Routes
