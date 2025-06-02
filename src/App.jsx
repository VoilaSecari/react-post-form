import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/index.css";
import axios from "axios";

export default function App() {
  //costanti
  const initialPostData = {
    author: "",
    title: "",
    body: "",
    public: false,
  };
  //useState
  const [postData, setPostData] = useState(initialPostData);
  const [submittedData, setSubmittedData] = useState();

  //handles
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData({ ...postData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //sakva dati submitted
    setSubmittedData(postData);

    //axios
    axios
      .post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", postData)
      .then((res) => {
        console.log(res.data);
      });

    //reset campi vuoti
    setPostData(initialPostData);
  };

  return (
    <main className="container p-3">
      <h1 className="mt-3">Il form con React</h1>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <div className="row g-3">
          <div className="col">
            <label htmlFor="author" className="form-label">
              Autore
            </label>
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder="Autore"
              id="author"
              value={postData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <label htmlFor="title" className="form-label">
              Titolo
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Titolo"
              id="title"
              value={postData.title}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col mt-4">
          <label htmlFor="body" className="form-label">
            Contenuto
          </label>
          <input
            type="text"
            className="form-control"
            name="body"
            placeholder="Contenuto del post..."
            id="body"
            value={postData.body}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 mt-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="public"
              name="public"
              checked={postData.public}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="public">
              Voglio che il contenuto sia pubblico
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-4">
            Invia post
          </button>
        </div>
      </form>
      <hr />
      {/* qui voglio vedere il contenuto per capire se è stato mandato */}
      {submittedData && (
        <ul>
          <li>Autore: {submittedData.author}</li>
          <li>Titolo: {submittedData.title}</li>
          <li>Contenuto: {submittedData.body}</li>
          <li>Post pubblico: {submittedData.public ? "Sì" : "No"}</li>
        </ul>
      )}
    </main>
  );
}
