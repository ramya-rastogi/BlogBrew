document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-post-form");

  // 🧠 Check for token: redirect if not logged in
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to create a post.");
    window.location.href = "auth.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !content || !category) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          genre: category,   // ✅ field name matches backend
          image: imageUrl    // ✅ field name matches backend
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to create blog");
      }

      alert("Blog published successfully!");
      window.location.href = "index.html";
    } catch (err) {
      console.error("Blog creation error:", err);
      alert("Error: " + err.message);
    }
  });
});