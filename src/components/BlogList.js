import { useState, useEffect } from "react";
// useHistory -> useNavigate
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import propTypes from "prop-types";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import useToast from "../hooks/toast";

const BlogList = ({ isAdmin }) => {
  const limit = 5;

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("page");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPosts, setNumOfPosts] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    setNumOfPages(Math.ceil(numOfPosts / limit));
  }, [numOfPosts]);

  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`);
    setCurrentPage(page);
    getPosts(page);
  };

  const getPosts = (page = 1) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
      title_like: searchText,
    };

    if (!isAdmin) {
      params = { ...params, publish: true };
    }

    axios
      .get(`http://localhost:3001/posts`, {
        params,
      })
      .then((res) => {
        setNumOfPosts(res.headers["x-total-count"]);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong in database");
        addToast({
          text: "Something went wrong!!",
          type: "danger",
        });
        console.log(err);
      });
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const deleteBlog = (e, id) => {
    e.stopPropagation();

    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        //setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        getPosts(1);
        addToast({
          text: "Successfully deleted.",
          type: "success",
        });
      })
      .catch((err) => {
        addToast({
          text: "The blog could not be deleted!!",
          type: "danger",
        });
        console.log(err);
      });
  };

  const renderBlogList = () => {
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

  if (loading) return <LoadingSpinner />;

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };

  if (error.length > 0) return <div>{error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="form-control"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />
      <hr />
      {posts.length === 0 ? (
        <div>No blog posts was found</div>
      ) : (
        <>
          {renderBlogList()}
          {numOfPages > 0 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numOfPages}
              onClick={onClickPageButton}
            />
          )}
        </>
      )}
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
