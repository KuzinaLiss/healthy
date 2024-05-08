import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  Start,
  Workout,
  WorkoutBlock,
  Calculation,
} from "./pages";

import React from "react";

import { fetchAuthMe, selectIsAuth } from "../src/redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/workout/block" element={<WorkoutBlock />} />
          <Route path="/calculation" element={<Calculation />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
