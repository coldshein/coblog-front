import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";

import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
    .then((res) =>{
      setData(res.data)
      setIsLoading(false);
    }).catch((err) => console.log(err));
  },[])
  
  if(isLoading){
    return <Post isLoading={isLoading}/>
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount='13'
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
