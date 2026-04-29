const container = document.getElementById("postsContainer");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

const state = {
  posts: []
};

async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    const posts = await res.json();

    state.posts = posts;
    
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

      <div class="actions">
        <button onclick="deletePost(${post.id})" class="danger">
          Delete Post
        </button>
      </div>
    </div>
  `).join("");
}

fetchPosts();


async function deletePost(id) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });
    state.posts = state.posts.filter(post => post.id !== id);
    renderPosts(state.posts);

  } catch (error) {
    alert("Error deleting post");
  }
}