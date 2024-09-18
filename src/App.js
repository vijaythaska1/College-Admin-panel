import React from 'react';
import './App.css';
import Layout from './commpand/Layout.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/LoginPage.jsx';
import Profile from './pages/Admin/Profile.jsx';
import ChangePassword from './pages/Admin/ChangePassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Studentlisting from './pages/Student/Studentlisting.jsx';
import AboutsUS from './pages/CMS/AboutsUS.jsx';
import TermsAndConditions from './pages/CMS/TermsAndConditions.jsx';
import PrivacyPolicy from './pages/CMS/PrivacyPolicy.jsx';
import AddStudent from './pages/Student/AddStudent.jsx';
import StudentView from './pages/Student/StudentView.jsx';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route element={<Layout />}>
          <Route path='/Dashboard' element={<Dashboard />} />
          {/* Admin */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          {/* Student */}
          <Route path='/Studentlisting' element={<Studentlisting />} />
          <Route path='/AddStudent' element={<AddStudent />} />
          <Route path='/StudentView' element={<StudentView />} />
          {/* CMS */}
          <Route path='/AboutsUS' element={<AboutsUS />} />
          <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />

        </Route>

      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false} />
    </BrowserRouter>


  );
}

export default App;