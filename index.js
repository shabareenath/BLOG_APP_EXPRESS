import express from "express";
import bodyParser from "body-parser";
const port = 3000;
let posts = [];
var nextId = 0;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs", {
    id: null,
    title: "",
    content: "",
  });
});

app.post("/submit", (req, res) => {
  console.log("this is /submit", req.body);
  const { title, content } = req.body;
  const newPost = { id: nextId++, title, content };
  posts.push(newPost);
  res.redirect("/posts");
});
app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.post("/delete", (req, res) => {
  console.log("Deleting Post with ID:", req.body);
  let id = req.body.id;
  posts = posts.filter((post) => post.id !== parseInt(id));
  res.redirect("/posts");
});

app.post("/edit", (req, res) => {
  let id = parseInt(req.body.id, 10);

  let editPost = posts.find((editPost) => editPost.id === id);
  console.log("editing Post with ID: ", editPost.id, "title: ", editPost.title);

  if (editPost) {
    res.render("home.ejs", {
      id: editPost.id,
      title: editPost.title,
      content: editPost.content,
    });
  } else {
    res.redirect("/posts"); // Handle case where post is not found
  }
});

app.post("/update", (req, res) => {

  console.log("update request incoming");
  const { id, title, content } = req.body;
  const postId = parseInt(id, 10);
  console.log("id for update:", id);

  const post = posts.find((post) => post.id == postId);
  if (post) {
    post.title = title;
    post.content = content;
    console.log(post);

    res.redirect("/posts");
  } else {
    res.redirect("/posts");
  }
});


app.listen(port, () => {
  console.log(`server is live at port ${port}`);
});
