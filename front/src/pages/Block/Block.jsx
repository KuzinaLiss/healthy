import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import styles from "./Block.module.scss";

import {fetchRemoveWorkout, selectIsWorkoutLoaded} from "../../redux/slices/workout";


export const Block = ({
  id,
  title,
  text,
  user,
  imageUrl,
  duration,
  difficulty,
  category,
  isLoading, // Добавляем isLoading
}) => { 
  const dispatch = useDispatch();
  
  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить тренировку?')) {
      dispatch(fetchRemoveWorkout(id));
    }
  };
  console.log(id);

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <img className={styles.image} src={imageUrl} alt={title} />
        )}
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{Block.title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.info}>
          <span className={styles.category}>{category}</span>
          <span className={styles.difficulty}>{difficulty}</span>
          <span className={styles.duration}>{duration}</span>
        </div>
        <div className={styles.actions}>
          <Link >
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
