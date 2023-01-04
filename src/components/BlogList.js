import { useState, useEffect } from "react";
// useHistory -> useNavigate
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";
import Pagination from "../components/Pagination";

const BlogList = ({ isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const getPosts = (page = 1) => {
    axios
      .get(`http://localhost:3001/posts`, {
        params: {
          _page: page,
          _limit: 5,
          _sort: "id",
          _order: "desc",
        },
      })
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

  useEffect(() => {
    getPosts();
  }, []);

  const renderBlogList = () => {
    return posts
      .filter((post) => {
        return isAdmin || post.publish;
      })
      .map((list) => {
        return (
          // Children을 이용하는 방법
          <Card
            key={list.id}
            title={list.title}
            onClick={() => {
              navigate(`/blogs/${list.id}`);
            }}
          >
            {isAdmin ? (
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => deleteBlog(e, list.id)}
                >
                  delete
                </button>
              </div>
            ) : null}
          </Card>
        );
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return <div>No blog posts was found</div>;
  }

  return (
    <div>
      {renderBlogList()}
      <Pagination />
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
