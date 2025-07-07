document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("blog-container");
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");

  if (!blogId) {
    blogContainer.innerHTML = "<p>Blog not found.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`);

    if (res.status === 404) {
      blogContainer.innerHTML = "<h2>Blog not found 💔</h2>";
      return;
    }

    const blog = await res.json();
    document.title = `${blog.title} | BlogBrew`;

    const formattedContent = blog.content
      .split('\n\n')
      .map(para => `<p>${para}</p>`)
      .join('');

    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

    // 🔍 Console logs for debugging
    console.log("Logged in user ID:", loggedInUser?.id);
    console.log("Blog author ID:", blog.author?._id || blog.author?.id);

    const isAuthor =
      loggedInUser?.id &&
      (loggedInUser.id === blog.author?._id || loggedInUser.id === blog.author?.id);

    // Render blog detail
    blogContainer.innerHTML = `
      <div class="blog-detail">
        <a href="index.html" class="back-link">← Back to Home</a>
        <h1>${blog.title}</h1>
        <p class="blog-meta">
          <strong>By:</strong> ${blog.author?.username || "Anonymous"} |
          <strong>Genre:</strong> ${blog.genre}
        </p>
        ${blog.image ? `<img src="${blog.image}" alt="Blog Image" class="blog-image" />` : ""}
        <div class="blog-content">
          ${formattedContent}
        </div>
        ${
          isAuthor
            ? `<div class="blog-actions">
                 <button onclick="deleteBlog('${blog._id}')">🗑️ Delete</button>
               </div>`
            : ""
        }
      </div>
    `;
  } catch (err) {
    console.error("Error loading blog:", err);
    blogContainer.innerHTML = "<p>Failed to load this blog post. Please try again later.</p>";
  }
});

// ✅ Delete function
async function deleteBlog(id) {
  const token = localStorage.getItem("token");
  const confirmDelete = confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || "Failed to delete blog");

    alert("Blog deleted successfully.");
    window.location.href = "index.html";
  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting blog: " + err.message);
  }
}