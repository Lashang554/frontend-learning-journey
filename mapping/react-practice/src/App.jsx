import { useState } from "react";

const users = [
  { id: 1, name: "Ram", role: "Frontend Learner", city: "Kathmandu" },
  { id: 2, name: "Hari", role: "React Student", city: "Pokhara" },
  { id: 3, name: "Sita", role: "JavaScript Mentor", city: "Lalitpur" },
  { id: 4, name: "Anita", role: "UI Designer", city: "Bhaktapur" },
];

function App() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [favoriteIds, setFavoriteIds] = useState([]);

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((firstUser, secondUser) =>
      firstUser[sortOrder].localeCompare(secondUser[sortOrder])
    );
  const hasResults = filteredUsers.length > 0;

  function handleToggleFavorite(userId) {
    setFavoriteIds((currentFavorites) =>
      currentFavorites.includes(userId)
        ? currentFavorites.filter((id) => id !== userId)
        : [...currentFavorites, userId]
    );
  }

  return (
    <main className="app">
      <section className="directory">
        <div className="directory__header">
          <p className="eyebrow">React map practice</p>
          <h1>Student Directory</h1>
          <p>Search names and render matching user cards from an array.</p>
        </div>

        <div className="controls">
          <label className="search-field">
            <span>Search users</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try Ram or Sita"
            />
          </label>

          <label className="sort-field">
            <span>Sort by</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="role">Role</option>
            </select>
          </label>
        </div>

        <p className="result-count">
          Showing {filteredUsers.length} of {users.length} users
        </p>

        {hasResults ? (
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <article className="user-card" key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.role}</p>
                <span>{user.city}</span>
                <button
                  className="favorite-button"
                  onClick={() => handleToggleFavorite(user.id)}
                  type="button"
                >
                  {favoriteIds.includes(user.id)
                    ? "Saved favorite"
                    : "Add favorite"}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No users found. Try another name.</p>
        )}
      </section>
    </main>
  );
}

export default App;
