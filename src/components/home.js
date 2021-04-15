import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.url} />
              <div className="card-content">
                <i className="material-icons">favorite_border</i>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="add acomment" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
