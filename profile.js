var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  console.log(username);
  var password = document.getElementById("password").value;
  console.log(password);
  var email = document.getElementById("email").value;
  console.log(email);
  var number = document.getElementById("number").value;
  console.log(number);
});

//fetch all posts
function getlatest() {
  document.querySelector(".posts").innerHTML = "";

  fetch(url + "/latestpost", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: "",
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("data");
      console.log(data);

      data.forEach((post) => {
        //parent node

        let card = document.createElement("div");
        card.classList.add("card");

        //user-section
        let user = document.createElement("div");
        user.classList.add("user");
        let left = document.createElement("div");
        left.classList.add("left");
        let user_img = document.createElement("i");
        user_img.classList.add("icon");
        user_img.classList.add("fa-regular");
        user_img.classList.add("fa-user");
        let para = document.createElement("p");
        para.innerHTML = post["name"];
        left.appendChild(user_img);
        left.appendChild(para);

        let trash = document.createElement("i");
        trash.classList.add("icon");
        trash.classList.add("trash");
        trash.classList.add("fa-solid");
        trash.classList.add("fa-trash");

        user.appendChild(left);
        if (localStorage.getItem("name") == post["name"]) {
          user.appendChild(trash);
        }

        //post image
        let img = document.createElement("img");
        img.setAttribute("src", post["image"]);
        //like comment share
        let options = document.createElement("div");
        options.classList.add("post-like");
        let like = document.createElement("i");
        like.classList.add("like");
        like.classList.add("icon");
        like.classList.add("fa-solid");
        like.classList.add("fa-heart");
        let comment = document.createElement("i");
        comment.classList.add("comment");
        comment.classList.add("icon");
        comment.classList.add("fa-regular");
        comment.classList.add("fa-comment");
        options.appendChild(like);
        options.appendChild(comment);
        let desc = document.createElement("div");
        desc.classList.add("desc");
        let Nu = document.createElement("p");
        Nu.innerHTML = "Likes : " + post["no_of_likes"];
        desc.appendChild(Nu);

        // let pp = document.createElement("p");
        // pp.innerHTML = "Title : " + post["title"];
        let bb = document.createElement("p");
        bb.innerHTML = "Description : " + post["msg"];
        let comments = document.createElement("div");
        comments.classList.add("comments");

        //post comment
        let com_desc = document.createElement("div");
        com_desc.setAttribute("id", "com_desc");
        comments.appendChild(com_desc);

        let post_co = document.createElement("form");
        let inp = document.createElement("input");
        inp.setAttribute("type", "text");
        inp.setAttribute("placeholder", "Add comment");
        inp.setAttribute("id", "inputcomment");

        let inp_sub = document.createElement("input");
        inp_sub.setAttribute("type", "submit");
        inp_sub.innerHTML = "submit";
        post_co.appendChild(inp);
        post_co.appendChild(inp_sub);
        comments.appendChild(post_co);

        //desc.appendChild(pp);
        desc.appendChild(bb);
        card.appendChild(user);
        card.appendChild(img);
        card.appendChild(options);
        card.appendChild(desc);
        card.appendChild(comments);

        document.querySelector(".posts").appendChild(card);

        //post id of current post
        const curr_postid = {
          postid: post["postid"],
        };

        like.addEventListener("click", () => {
          likepost();
        });

        function likepost() {
          fetch(url + "/like", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json,text/plain,*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(curr_postid),
          })
            .then((res) => res.json())
            .then((data) => {
              Nu.innerHTML = "Likes : " + data["no_of_likes"];
            })
            .catch((error) => {
              console.dir(error);
            });
        }

        function latestcomment() {
          com_desc.innerHTML = "";

          fetch(url + "/showcomment", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json,text/plain,*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(curr_postid),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              data.forEach((ele) => {
                let ind_com = document.createElement("div");
                ind_com.classList.add("individual_comment");

                user_label = document.createElement("p");
                user_label.innerHTML = ele["name"];
                var usercomment = document.createElement("p");
                usercomment.classList.add("usercomment");
                usercomment.innerHTML = ele["msg"];

                let delpost_i = document.createElement("i");
                delpost_i.classList.add("icon");
                delpost_i.classList.add("trash");
                delpost_i.classList.add("comtrash");
                delpost_i.classList.add("fa-solid");
                delpost_i.classList.add("fa-trash");
                ind_com.appendChild(user_label);
                ind_com.appendChild(usercomment);
                if (localStorage.getItem("name") == ele["name"]) {
                  ind_com.appendChild(delpost_i);
                }
                var commentid = {
                  commentid: ele["commentid"],
                };
                delpost_i.addEventListener("click", () => {
                  fetch(url + "/deletecomment", {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                      Accept: "application/json,text/plain,*/*",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentid),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data["status"] == "Success") {
                        latestcomment();
                      }
                    })
                    .catch((er) => console.dir(er));
                });

                com_desc.appendChild(ind_com);
                // comments.insertBefore(user_label,post_co);
                // comments.insertBefore(usercomment,post_co);
              });
            })
            .catch((error) => {
              console.dir(error);
            });
        }
        //get comments for each post

        comment.addEventListener("click", () => {
          latestcomment();
        });

        //post comment
        function postcomment(c) {
          fetch(url + "/comment", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json,text/plain,*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(c),
          })
            .then((res) => res.json())
            .then((data) => {
              //console.log(data);
              if (data["status"] == "Success") {
                latestcomment();
              }
            })
            .catch((error) => {
              console.dir(error);
            });
        }

        post_co.addEventListener("submit", (e) => {
          e.preventDefault();
          var new_comment = inp.value;
          // console.log(new_comment);
          var c = {
            postid: post["postid"],
            msg: new_comment,
          };
          postcomment(c);
        });

        //delete post
        function deletepost() {
          fetch(url + "/deletepost", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json,text/plain,*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(curr_postid),
          })
            .then((res) => res.json())
            .then((data) => {
              //console.log(data);
              if (data["status"] == "Success") {
                getlatest();
              }
            })
            .catch((error) => {
              console.dir(error);
            });
        }

        //delete comment
        trash.addEventListener("click", () => {
          deletepost();
        });
      });
    })
    .catch((error) => {
      console.dir("Error:", error);
    });
}
