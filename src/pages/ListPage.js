import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// useHistory -> useNavigate
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const ListPage = () => {
  const [posts, setPosts] = useState([]);

  const getList = () => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blog Lists</h1>
        <Link className="btn btn-success" to="/blogs/create">
          Create New
        </Link>
      </div>

      <hr />
      {posts.map((list) => {
        return (
          // Children을 이용하는 방법
          <Card
            key={list.id}
            title={list.title}
            onClick={() => {
              console.log("Yong");
            }}
          >
            <div className="d-flex justify-content-between">
              <div>{list.title}</div>
              <button>button</button>
            </div>
          </Card>

          // <Card key={list.id} title={list.title} body={list.body} />
        );
      })}
    </div>
  );
};

export default ListPage;
