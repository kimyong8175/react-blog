import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";
import Toast from "../components/Toast";
import useToast from "../hooks/toast";

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          });
      }
    }
  };
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

      {/* goBack 이란 함수를 만들어서 navigate 함수를 사용하려 했지만 useEffect안에서 써야한다고 에러가 뜸 */}
      {/* <button
        className="btn btn-danger ms-2"
        onClick={() => {
          if (editing) navigate(`/blogs/${id}`);
          else navigate("/blogs");
        }}
      >
        Cancle
      </button> 
      이유: onClick function 안에 goBack() 괄호를 붙임.
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
