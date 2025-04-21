import { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import AddCourse from './pages/admin/course/AddCourse'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import Course from './pages/student/Course'
import CourseTable from './pages/admin/course/CourseTable'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      //admin routes started from here onwards
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
        ],
      },
    ],
  },
  {},
]);
function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId="247653186010-b9fe9cjhi7luljuodmbieuk13dejru0i.apps.googleusercontent.com">
      <main>
        <RouterProvider router={appRouter}/>
      </main>
    </GoogleOAuthProvider>
  )
}

export default App
