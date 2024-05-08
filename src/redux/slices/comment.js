import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchComments = createAsyncThunk(
    'comments/fetchComments', // Название действия
    async (postId) => { // Функция-обработчик для выполнения запроса
      const { data } = await axios.get(`/posts/${postId}/comments`);
      return data; // Возвращаем данные
    }
  );

const initialState = {
   
        items: [],
        status: "loading",
        error: null,

};

const commentsSliice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    //отлавливаем 3 состояния запроса
    extraReducers: (builder) => {
        // Загрузка комментариев
        builder.addCase(fetchComments.pending, (state) => {
            state.comments.items = [];
            state.comments.status = 'loading';
        });
        // Запрос выполнен успешно для комментариев
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments.items = action.payload;
            state.comments.status = 'loaded';
        });
        // При запросе комментариев произошла ошибка
        builder.addCase(fetchComments.rejected, (state) => {
            state.comments.items = [];
            state.comments.status = 'error';
        });
    }
});

export const commentsReducer = commentsSliice.reducer;
export const selectIsCommentsLoaded = (state) =>
    state.comments.status === "loaded";
export const selectComments = (state) => state.comments.items;