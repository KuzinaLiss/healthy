import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";



import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPost,  fetchTags } from "../redux/slices/posts";

export const Home = () => {

  const dispatch  = useDispatch();
  const userData = useSelector((state)=> state.auth.data);
  const {posts, tags} = useSelector((state) => state.posts);
  const [selectedTab, setSelectedTab] = useState(0);

  const isPostLoading = posts.status === 'loading';
  const isTagLoading = tags.status === 'loading';
  

  React.useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchTags());
  }, []);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const sortedPosts = () => {
    if (selectedTab === 0) {
      // Сортировка по дате, если выбран таб "Новые"
      return posts.items.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // Сортировка по количеству просмотров, если выбран таб "Популярные"
      return posts.items.slice().sort((a, b) => b.viewsCount - a.viewsCount);
    }
  };

  return (
    <>
      <Tabs
       style={{ marginBottom: 15 }}
       value={selectedTab}
       onChange={handleChangeTab}
       aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
      <Grid xs={8} item>
          {isPostLoading
            ? [...Array(5)].map((_, index) => <Post key={index} isLoading={true} />)
            : sortedPosts().map((obj) => (
                <Post
                  key={obj._id}
                  id={obj._id}
                  imageUrl={obj.imageUrl}
                  title={obj.title}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagLoading}/>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Петров Василий",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Спасибо за ваши советы по питанию. Очень полезные и интересные",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "Ваши тренировки лучшие!",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
