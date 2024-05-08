import Comment from '../models/Comment.js';

// Контроллер для создания комментария
export const createComment = async (req, res) => {
    const { postId, userId, content } = req.body;
    
    try {
        const comment = new Comment({ postId, userId, content });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось создать комментарий' });
    }
};

// Контроллер для получения комментариев для определенной статьи
export const getCommentsByPostId = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ postId:id});
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось получить комментарии' });
    }
};