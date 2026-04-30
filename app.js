const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";

const container = document.getElementById("postsContainer");
const postForm = document.getElementById("postForm");
const postIdInput = document.getElementById("postId");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

let posts = [];
let isEditing = false;

//////////////////////////////////////////////////////
// 📖 FETCH POSTS
//////////////////////////////////////////////////////
async function fetchPosts() {
  loadingMessage.style.display = "block";
  errorMessage.classList.add("hidden");

  try {
    const res = await fetch(API_URL);
    posts = await res.json();
    renderPosts(posts);
  } catch (err) {
    errorMessage.classList.remove("hidden");
  } finally {
    loadingMessage.style.display = "none";
  }
}

//////////////////////////////////////////////////////
// 🧱 RENDER POSTS
//////////////////////////////////////////////////////
function renderPosts(data) {
  container.innerHTML = "";

  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

//////////////////////////////////////////////////////
// ➕ CREATE + ✏️ UPDATE
//////////////////////////////////////////////////////
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) return;

  try {
    if (isEditing) {
      const id = Number(postIdInput.value);

      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
      });

      posts = posts.map(p =>
        p.id === id ? { ...p, title, body } : p
      );

    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
      });

      const newPost = await res.json();
      posts.unshift(newPost);
    }

    resetForm();
    renderPosts(posts);

  } catch (err) {
    errorMessage.classList.remove("hidden");
  }
});

//////////////////////////////////////////////////////
// ❌ DELETE POST
//////////////////////////////////////////////////////
async function deletePost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Delete failed");

    posts = posts.filter(p => p.id !== id);
    renderPosts(posts);

  } catch (err) {
    errorMessage.classList.remove("hidden");
  }
}

//////////////////////////////////////////////////////
// ✏️ EDIT POST
//////////////////////////////////////////////////////
function editPost(id) {
  const post = posts.find(p => p.id === id);

  if (!post) return;

  titleInput.value = post.title;
  bodyInput.value = post.body;
  postIdInput.value = post.id;

  isEditing = true;
}

//////////////////////////////////////////////////////
// 🧼 RESET FORM
//////////////////////////////////////////////////////
function resetForm() {
  titleInput.value = "";
  bodyInput.value = "";
  postIdInput.value = "";
  isEditing = false;
}

// INIT
fetchPosts();
