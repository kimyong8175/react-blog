import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const printDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString();
  };

  useEffect(() => {
    getPost(id);
  }, [id]);
  // dependancy array -> inside of the array, statable value
  // 배열 안에 들어가는 값은 값이 변화할 때 rerendering 을 시켜야하는 값

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <small className="text-muted">
        Created At: {printDate(post.createdAt)}
      </small>
      <hr />
      <p>{post.body}</p>
    </div>
  );
};

export default ShowPage;
