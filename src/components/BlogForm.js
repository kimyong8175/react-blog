import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";
import Toast from "../components/Toast";
import useToast from "../hooks/toast";
import LoadingSpinner from "./LoadingSpinner";

const BlogForm = ({ editing }) => {
  const { addToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setoriginalBody] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      axios
        .get(`http://localhost:3001/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setBody(res.data.body);

          setOriginalTitle(res.data.title);
          setoriginalBody(res.data.body);

          setPublish(res.data.checked);
          setOriginalPublish(res.data.checked);
          setLoading(false);
        })
        .catch((err) => {
          setError("There is some error in database");
          addToast({
            text: "There is some error in database",
            type: "danger",
          });
          console.log(err);
          setLoading(false);
        });
    } else setLoading(false);
  }, [id, editing]);

  const isEdited = () => {
    return (
      title !== originalTitle ||
      body !== originalBody ||
      publish !== originalPublish
    );
  };

  const goBack = () => {
    if (editing) navigate(`/blogs/${id}`);
    else navigate("/admin");
  };

  const onChangePublish = (e) => {
    publish === false ? setPublish(true) : setPublish(false);
  };

  const validateForm = () => {
    let validated = true;

    if (title === "") {
      setTitleError(true);
      validated = false;
    }

    if (body === "") {
      setBodyError(true);
      validated = false;
    }

    return validated;
  };

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);

    if (validateForm()) {
      if (editing) {
        axios
          .patch(`http://localhost:3001/posts/${id}`, {
            title,
            body,
            publish,
          })
          .then(() => {
            navigate(`/blogs/${id}`);
          })
          .catch((err) => {
            addToast({
              text: "It is unavailable to update the blog!!",
              type: "danger",
            });
            console.log(err);
          });
      } else {
        axios
          .post("http://localhost:3001/posts", {
            title,
            body,
            publish,
            createdAt: Date.now(),
          })
          .then(() => {
            addToast({
              type: "success",
              text: "Successfully created.",
            });
            navigate("/admin");
          })
          .catch((err) => {
            addToast({
              text: "It is unavailable to create the blog!!!!",
              type: "danger",
            });
            console.log("Error: " + err);
          });
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error.length > 0) return <div>{error}</div>;

  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError && "border-danger"}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {titleError && <div className="text-danger">Title is required.</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className={`form-control ${bodyError && "border-danger"}`}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          rows="20"
        />
        {bodyError && <div className="text-danger">Body is required.</div>}
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={onChangePublish}
        />
        <label className="from-check-label">Publish</label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>

      {/* goBack ?????? ????????? ???????????? navigate ????????? ???????????? ????????? useEffect????????? ??????????????? ????????? ??? */}
      {/* <button
        className="btn btn-danger ms-2"
        onClick={() => {
          if (editing) navigate(`/blogs/${id}`);
          else navigate("/blogs");
        }}
      >
        Cancle
      </button> 
      ??????: onClick function ?????? goBack() ????????? ??????.
      */}

      <button className="btn btn-danger ms-2" onClick={goBack}>
        Cancle
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
