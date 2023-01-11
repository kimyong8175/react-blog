import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/toast";

const ShowPage = () => {
  const { id } = useParams();
  const { addToast } = useToast();
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const getPost = (id) => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong in database");
        addToast({
          text: "Something went wrong in database",
          type: "danger",
        });
        console.log(err);
      });
  };

  const printDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Hello");
      setTimer((prev) => prev + 1);
    }, 1000);

    // state 가 unmounte 될 때 실행 되게 해줄 함수
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getPost(id);
  }, [id]);
  // dependancy array -> inside of the array, statable value
  // 배열 안에 들어가는 값은 값이 변화할 때 rerendering 을 시켜야하는 값

  if (loading) return <LoadingSpinner />;
  if (error.length > 0) <div>{error}</div>;

  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">
          {post.title} ({timer}초)
        </h1>
        {isLoggedIn && (
          <div>
            <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
              Edit
            </Link>
          </div>
        )}
      </div>
      <small className="text-muted">
        Created At: {printDate(post.createdAt)}
      </small>
      <hr />
      <p>{post.body}</p>
    </div>
  );
};

export default ShowPage;
