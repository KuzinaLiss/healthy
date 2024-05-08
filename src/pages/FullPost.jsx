import React from "react";
import {useParams} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';


import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const {id} = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await axios.get(`/posts/${id}`);
        setData(postData.data);
        
        const commentsData = await axios.get(`/posts/${id}/comments`);
        setComments(commentsData.data);
        console.log(commentsData.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        alert('Ошибка при загрузке данных!');
      }
    };
  
    fetchData();
  }, [id]);
 
  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>;
  }

 
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={comments}
        
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
