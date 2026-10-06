import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ProfileView from './views/ProfileView/ProfileView';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import HomeView from './views/HomeView/HomeView';
import PostView from './views/PostView/PostView';
import CreatePostView from './views/CreatePostView/CreatePostView';
import { UserContext } from './context/UserContext';
import axios from 'axios';

export default function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div id="cart-app">
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/logout" element={<LogoutView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/" element={<HomeView />} />
              <Route path="/posts/:postId" element={<PostView />} />
              <Route path="/profile/:username" element={<ProfileView />} />
              <Route path="/create-post" element={<CreatePostView />} />
              
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}
