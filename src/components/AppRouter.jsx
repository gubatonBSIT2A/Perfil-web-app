import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profile/Profile'
import EditProfile from '../pages/Profile/Update'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import IndexClient from '../pages/TargetClientList/IndexClient'
import SocialWorker from '../pages/SocialWorker/SocialWorker'
import Patients from '../pages/Patients/Patients'
import Establishments from '../pages/Establishments/Establishments'
import EstablishmentDetails from '../pages/Establishments/EstablishmentDetails'
import Landingpage from '../pages/Landingpage'
import Homepage from '../pages/Homepage/Homepage'
import AppointmentDetails from '../pages/Appointments/AppointmentDetails'
import ExaminationDetails from '../pages/Examinations/ExaminationDetails'
import PatientDetails from '../pages/Patients/PatientDetails'
import Reports from '../pages/Reports/Reports'
export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Landingpage} />
          <ProtectedRoute exact path='/login' component={Loginpage} />
          <ProtectedRoute exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/profile/edit' component={EditProfile} />
          <ProtectedRoute exact path='/social-worker' component={SocialWorker} />
          <ProtectedRoute exact path='/target-client-list' component={IndexClient} />
          <ProtectedRoute exact path='/reports' component={Reports} />
          <ProtectedRoute exact path='/forgot-password' component={ForgotPasswordPage} />
          <ProtectedRoute exact path='/reset-password' component={ResetPasswordPage} />

          <ProtectedRoute exact path='/home' component={Homepage} />
          <ProtectedRoute exact path='/patients' component={Patients} />
          <ProtectedRoute exact path='/patients/details' component={PatientDetails} />
          <ProtectedRoute exact path='/establishments' component={Establishments} />
          <ProtectedRoute exact path='/establishments/details' component={EstablishmentDetails} />
          <ProtectedRoute exact path='/establishments/details/appointment' component={AppointmentDetails} />
          <ProtectedRoute exact path='/establishments/details/appointment/examination' component={ExaminationDetails} />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth()

  const { path } = props
  const location = useLocation()

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/home'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  )
}
