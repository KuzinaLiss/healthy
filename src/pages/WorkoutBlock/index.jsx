import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts, selectWorkout, selectIsWorkoutLoaded } from "../../redux/slices/workout";
import { Block } from "../Block/Block";
import Grid from "@mui/material/Grid";

import axios from '../../axios';

export const WorkoutBlock = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectIsWorkoutLoaded);
  const workouts = useSelector((state) => state.workouts); 
  
  useEffect(() => {
    useDispatch(fetchWorkouts());
    console.log(isLoaded);
  }, [isLoaded]);



  return (
  <div></div>
  );
};


