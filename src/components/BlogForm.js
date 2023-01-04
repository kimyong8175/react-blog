import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setoriginalBody] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

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
    else navigate("/blogs");
  };

  const onChangePublish = (e) => {
    publish === false ? setPublish(true) : setPublish(false);
  };

  const onSubmit = () => {
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
          navigate("/admin");
        });
    }
  };
  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          rows="20"
        />
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
  editing: bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
