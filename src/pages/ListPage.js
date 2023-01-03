import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// useHistory -> useNavigate
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const ListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const getList = () => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    console.log("delete");
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  const renderBlogList = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (posts.length === 0) {
      return <div>No blog posts was found</div>;
    }

    return posts.map((list) => {
      return (
        // Children을 이용하는 방법
        <Card
          key={list.id}
          title={list.title}
          onClick={() => {
            navigate(`/blogs/${list.id}`);
          }}
        >
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, list.id)}
            >
              delete
            </button>
          </div>
        </Card>
      );
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blog Lists</h1>
        <div>
          <Link className="btn btn-success" to="/blogs/create">
            Create New
          </Link>
        </div>
      </div>
      <hr />
      {renderBlogList()}
    </div>
  );
};

export default ListPage;
