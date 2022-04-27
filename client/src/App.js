import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/registration/Auth";
import Posts from "./components/posts/Posts";
import Home from "./components/Home";
import Navigation from "./components/nav/Navigation";
import AddPost from "./components/posts/AddPost";
import EditPost from "./components/posts/EditPost";
import ViewPost from "./components/posts/ViewPost";
import Profile from "./components/Profile";
import NoMatch from "./components/NoMatch";
import Layout from "./components/Layout";
import { CLIENT_URLS } from "./constants/clientRoutes";


function App() {
  // TODO Refactor loggin based on actual authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={CLIENT_URLS.auth} element={<Auth />} />
          <Route path={CLIENT_URLS.profile} element={<Profile />} />

          <Route path={CLIENT_URLS.posts} element={<Posts />} />
          <Route path={CLIENT_URLS.add_post} element={<AddPost />} />
          <Route path={CLIENT_URLS.edit_post} element={<EditPost />} />
          <Route path={CLIENT_URLS.view_post} element={<ViewPost />} />

          <Route path={CLIENT_URLS.no_match} element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;