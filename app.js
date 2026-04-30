const container = document.getElementById("postsContainer");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");


let posts = [];

async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    posts = await res.json();
    loadingMessage.style.display = "none";
    renderPosts(posts);
  } catch (error) {
    loadingMessage.style.display = "none";
    errorMessage.classList.remove("hidden");
  }
}

function renderPosts(posts) {
  container.innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `).join("");
}


// Add event listener to the add post form
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");

postForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const newPost = {
    title: titleInput.value,
    body: bodyInput.value
  };
  appendPost(posts, newPost);
  postForm.reset();
});

fetchPosts();

// Appends a new post to the posts collection and updates the UI
function appendPost(posts, newPost) {
  posts.push(newPost);
  renderPosts(posts);
}


