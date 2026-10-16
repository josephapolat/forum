import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '/NavBar.jsx';
import ProfileView from '/ProfileView.jsx';
import LoginView from '/LoginView.jsx';
import LogoutView from '/LogoutView.jsx';
import RegisterView from '/RegisterView.jsx';
import HomeView from '/HomeView.jsx';
import PostView from '/PostView.jsx';
import CreatePostView from '/CreatePostView.jsx';
import { UserContext } from '/UserContext.jsx';
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
