import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Menu from './component/Menu/Menu'
import About from './component/About/About'
import Error from './component/Error/Error'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Payment from './component/Payment/Payment'
import UserContextProvider from './component/Context/userContext'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import { MenuProvider } from './component/Context/menuContext';
import OrderConfirmation from './component/OrderConfirm/OrderConfirm'
import PaymentProcess from './component/PaymentProcess/PaymentProcess'
import RecentOrders from './component/RecentOrders/RecentOrders'
import OrderDetails from './component/OrderDetails/OrderDetails'



const routers = createBrowserRouter([
  { 
    path: '',
    element: <Layout />,
    children: [
      {
        index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'menu', element: <ProtectedRoute><Menu /></ProtectedRoute> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
      { path: '*', element: <Error /> },
      { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: '/payment-process', element: <ProtectedRoute><PaymentProcess /></ProtectedRoute> },
      { path: '/order-confirmation', element: <ProtectedRoute><OrderConfirmation /></ProtectedRoute> },
      { path: '/recent-orders', element: <ProtectedRoute><RecentOrders /></ProtectedRoute> },
      { path: '/order-details/:orderId', element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
    ]
  }
])

function App() {

  return (
    <>
      <UserContextProvider>
        <MenuProvider>
          <RouterProvider router={routers}></RouterProvider>
        </MenuProvider>
      </UserContextProvider>
    </>
  )
}

export default App
