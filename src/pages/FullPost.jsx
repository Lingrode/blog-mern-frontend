import React from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error when receiving article");
      });
  }, [id]);

  if (isLoading) {
    return <Post isFullPost isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <Markdown>{data.text}</Markdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Vasya Pupkin",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "This is test comment 555555",
          },
          {
            user: {
              fullName: "Ivan Ivanov",
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
