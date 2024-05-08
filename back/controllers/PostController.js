import { validationResult } from 'express-validator';
import PostModel from '../models/Post.js';


// функция для извлечения всех тэгов
export const getLastTags =async (req,res)=>{
    try{
        //извлечение тэгов через find
        const posts = await PostModel.find().limit(5).exec();//получение пяти последних тэгов
        
        const tags = posts
            .map(obj => obj.tags)
            .flat()
            .slice(0, 5);
        //вывод тэгов
        res.json (tags);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить тэги',
        });
    }
}

// функция для извлечения всех записей из таблицы
export const getAll =async (req,res)=>{
    try{
        //извлечение всех записей через find
        const posts = await PostModel.find().populate('user').exec();
        //вывод всех статей
        res.json (posts);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить статьи',
        });
    }
}

// функция для извлечения одной записи из таблицы
export const getOne =async (req,res)=>{
    try{
        //вытаскиваем id таблицы post
        const postId=req.params.id;

        //Получаем статью и обновляем количество просмотров
        const updatedDoc = await PostModel.findOneAndUpdate(
        {_id:postId },
        {$inc: {viewsCount: 1}},// inc - увеличить. пишем, что хотим увеличить и число, на сколько мы хотим его увеличить
        {new:true}, // возвращаем обновлённый результат
        ).populate('user');
        // если статьи нет, то выводим сообщение
        if (!updatedDoc) {
            return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
        res.json(updatedDoc);
    
  
    }
    catch (err){
        console.log(err);
        res.status(500).json({
        message: 'не удалось получить статьи',
        });
    }
}

// функция для удаления одной записи из таблицы
export const remove = async (req,res)=>{
    try{
        //вытаскиваем id таблицы post
        const postId=req.params.id;

        //Получаем статью и удаляем её
        const deletedDoc = await PostModel.findOneAndDelete({_id:postId },);
       
        // если статья не удалилась
        if (!deletedDoc) {
            return res.status(404).json({
            message: 'Не удалось удалить статью',
          });
        }

        //если статья удалилась
        res.json({
            success:true,
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({
        message: 'Не удалось получить статью',
        });
    }
}

// функция для обновления одной записи из таблицы
export const update = async (req,res)=>{
    try{
        //вытаскиваем id таблицы post
        const postId=req.params.id;

        //Получаем статью и удаляем её
        const updatedDoc = await PostModel.findOneAndUpdate(
            {_id:postId },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags.split(','),
                imageUrl:req.body.imageUrl,
                user: req.userId,
            },
            {new: true}
        );
       
        // если статья не изменилась
        if (!updatedDoc) {
            return res.status(404).json({
            message: 'Не удалось изменить статью',
          });
        }

        //если статья изменилась
        res.json({
            success:true,
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({
        message: 'Не удалось обновить статью',
        });
    }
}

// функция для добавления записей в таблицу
export const create = async(req, res) =>{
    try{
   
            const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            imageUrl:req.body.imageUrl,
            user: req.userId, //при авторизации мы получаем id пользователя, который хранится в req, поэтому мы его вытаскиваем
        });

        //сохранение информации в MongoDB
        const post = await doc.save();

        res.json(post); //возвращаем ответ
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить статью',
        });
    }
};