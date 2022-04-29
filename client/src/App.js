import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./components/posts/Posts";
import Home from "./components/Home";
import Navigation from "./components/nav/Navigation";
import AddPost from "./components/posts/AddPost";
import EditPost from "./components/posts/EditPost";
import ViewPost from "./components/posts/ViewPost";
import Profile from "./components/profile/Profile";
import NoMatch from "./components/NoMatch";
import Layout from "./components/Layout";


function App() {
  // TODO Refactor loggin based on actual authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"/profile"} element={<Profile />} />

          <Route path={"/posts"} element={<Posts />} />
          <Route path={"/posts/add"} element={<AddPost />} />
          <Route path={"/posts/:id/edit"} element={<EditPost />} />
          <Route path={"/posts/:id/view"} element={<ViewPost />} />

          <Route path={"*"} element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;