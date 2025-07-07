document.addEventListener("DOMContentLoaded", () => {
  const blogGrid = document.getElementById("blog-grid");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  let allBlogs = [];

  // Fetch blogs from backend
  async function fetchBlogs() {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      allBlogs = data;
      renderBlogs(allBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  // Render blogs grouped by genre
  function renderBlogs(blogs) {
    blogGrid.innerHTML = "";

    const genres = [...new Set(blogs.map(blog => blog.genre))];

    genres.forEach(genre => {
      const genreSection = document.createElement("div");
      genreSection.className = "genre-section";

      const heading = document.createElement("h3");
      heading.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
      heading.className = "genre-heading";

      const genreGrid = document.createElement("div");
      genreGrid.className = "grid";

      blogs
        .filter(blog => blog.genre === genre)
        .forEach(blog => {
          const card = document.createElement("div");
          card.className = "blog-card";
          card.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content.slice(0, 100)}...</p>
            <p><strong>By:</strong> ${blog.author?.username || "Anonymous"}</p>
            <button onclick="window.location.href='blog.html?id=${blog._id}'">Read More</button>
          `;
          genreGrid.appendChild(card);
        });

      genreSection.appendChild(heading);
      genreSection.appendChild(genreGrid);
      blogGrid.appendChild(genreSection);
    });
  }

  // Filter blogs by search + genre
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = categoryFilter.value;

    const filtered = allBlogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm);
      const matchesGenre = selectedGenre ? blog.genre === selectedGenre : true;
      return matchesSearch && matchesGenre;
    });

    renderBlogs(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  fetchBlogs();
});