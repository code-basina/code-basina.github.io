import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import MyCourses from './pages/Dashboard/MyCourses';
import Schedule from './pages/Schedule';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminCourses from './pages/Admin/AdminCourses';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminContent from './pages/Admin/AdminContent';
import About from './pages/About';
import Contact from './pages/Contact';
import SupportGuide from './pages/SupportGuide';
import FAQ from './pages/FAQ';
import SupportContact from './pages/SupportContact';
import ReportIssue from './pages/ReportIssue';

function App() {
  return (
    <>
      <Helmet>
        <title>با سینا - آموزش برنامه نویسی</title>
        <meta name="description" content="وب سایت آموزش برنامه نویسی با سینا" />
        <meta name="keywords" content="برنامه نویسی, آموزش, کد, سینا, javascript, python, react" />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="my-courses" element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          } />
          <Route path="checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="content" element={<AdminContent />} />
          </Route>
          
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="support-guide" element={<SupportGuide />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="support-contact" element={<SupportContact />} />
          <Route path="report-issue" element={<ReportIssue />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App; 