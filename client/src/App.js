import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OfferPage from './pages/OfferPage';
import BlogPage from './pages/BlogPage';
import BmiPage from './pages/BmiPage';
import BmrPage from './pages/BmrPage';
import ExercisesPage from './pages/ExercisesPage';
import ContactPage, { action as sendContactMessage } from './pages/ContactPage';
import SignupPage, { action as registerUser } from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AddPostPage from './pages/AddPostPage';
import PostDetailsPage from './pages/PostDetailsPage';
import EditPostPage from './pages/EditPostPage';
import { getAuthToken } from './utils/auth';
import { checkAuthLoader } from './utils/auth';
import { action as logout } from './pages/Logout';
import { action as loginUser } from './pages/LoginPage';
import { action as registerNewsletterEmail } from './components/Layout/Footer/Newsletter';
import { loader as fetchPosts } from './pages/BlogPage';
import { loader as fetchPost } from './pages/PostDetailsPage';
import { action as removePost } from './pages/PostDetailsPage';
import { action as updatePost } from './pages/EditPostPage';
import { action as addPost } from './pages/AddPostPage';
import { action as placeOrder } from './components/UI/Cart/Cart';
import { loader as fetchExercises } from './pages/ExercisesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: getAuthToken,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/offer',
        element: <OfferPage />,
      },
      {
        path: '/blog',
        element: <BlogPage />,
        loader: fetchPosts,
      },
      {
        path: '/blog/add',
        element: <AddPostPage />,
        action: addPost,
        loader: checkAuthLoader,
      },
      {
        path: '/blog/:id',
        id: 'post',
        loader: fetchPost,
        children: [
          {
            path: '/blog/:id',
            element: <PostDetailsPage />,
            action: removePost,
          },
          {
            path: '/blog/:id/edit',
            element: <EditPostPage />,
            action: updatePost,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: '/calculators/bmi',
        element: <BmiPage />,
      },
      {
        path: '/calculators/bmr',
        element: <BmrPage />,
      },
      {
        path: '/exercises',
        element: <ExercisesPage />,
        loader: fetchExercises,
      },
      {
        path: '/contact',
        element: <ContactPage />,
        action: sendContactMessage,
      },
      {
        path: '/login',
        element: <LoginPage />,
        action: loginUser,
      },
      {
        path: '/signup',
        element: <SignupPage />,
        action: registerUser,
      },
      {
        path: '/logout',
        action: logout,
      },
      {
        path: '/newsletter',
        action: registerNewsletterEmail,
      },
      {
        path: '/cart',
        action: placeOrder,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
