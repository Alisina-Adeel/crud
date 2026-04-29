const container = document.getElementById("postsContainer");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    const posts = await res.json();
    
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

fetchPosts();
