import { useState, useEffect } from "react";
// useHistory -> useNavigate
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import propTypes from "prop-types";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Toast from "./Toast";

const BlogList = ({ isAdmin }) => {
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
  const [toasts, setToasts] = useState([]);
  const limit = 5;

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
        console.log(err);
      });
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const addToasts = (toast) => {
    const toastWithId = {
      ...toast,
      id: uuidv4(),
    };
    setToasts((prev) => [...prev, toastWithId]);
  };

  const deleteToast = (id) => {};

  const deleteBlog = (e, id) => {
    e.stopPropagation();

    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      addToasts({
        text: "Successfully deleted.",
        type: "danger",
      });
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

  if (loading) {
    return <LoadingSpinner />;
  }
  console.log("console");
  const PAGE_ONE = 1;
  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`${location.pathname}?page=1`);
      setCurrentPage(PAGE_ONE);
      getPosts(1);
    }
  };

  return (
    <div>
      <Toast toasts={toasts} deleteToast={deleteToast} />
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
          {numOfPages > 1 && (
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
