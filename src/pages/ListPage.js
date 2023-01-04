import BlogList from "../components/BlogList";

const ListPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blog Lists</h1>
      </div>
      <hr />
      <BlogList />
    </div>
  );
};

export default ListPage;
