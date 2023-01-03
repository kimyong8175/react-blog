import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setoriginalBody] = useState("");
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, editing]);

  const isEdited = () => {
    return title !== originalTitle || body !== originalBody;
  };

  const goBack = () => {
    navigate(`/blogs/${id}`);
  };

  const onSubmit = () => {
    if (editing) {
      axios
        .patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
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
          createdAt: Date.now(),
        })
        .then(() => {
          navigate("/blogs");
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
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-2" onClick={goBack()}>
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
