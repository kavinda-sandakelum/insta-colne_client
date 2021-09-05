import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const dislikePost = (id) => {
    fetch("/dislike", {
      method: "put",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  // const deleteComment = (postId, commentid) => {
  //   fetch(`/deletecomment/${postId},${commentid}`, {
  //     method: "delete",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const newData = data.filter((item) => {
  //         return item._id !== result._id;
  //       });
  //       setData(newData);
  //     });
  // };

  const commentArray = (text, postId) => {
    fetch("/comment", {
      method: "put",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>{" "}
              {item.postedBy._id == state._id && (
                <i
                  className="material-icons"
                  style={{ float: "right" }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>

            <div className="card-image">
              <img src={item.url} />
              <div className="card-content">
                {item.likes.includes(state._id) ? (
                  <i
                    className="material-icons icon-red"
                    onClick={() => {
                      dislikePost(item._id);
                    }}
                  >
                    favorite
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    onClick={() => {
                      likePost(item._id);
                    }}
                  >
                    favorite_border
                  </i>
                )}

                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: 600 }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {record.text}{" "}
                      <i
                        class="material-icons"
                        style={{ float: "right" }}
                        // onClick={() => deleteComment()}
                      >
                        delete
                      </i>
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    commentArray(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder="add acomment" />
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
