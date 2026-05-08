import { useState } from "react";

const users = [
  { id: 1, name: "Ram", role: "Frontend Learner", city: "Kathmandu" },
  { id: 2, name: "Hari", role: "React Student", city: "Pokhara" },
  { id: 3, name: "Sita", role: "JavaScript Mentor", city: "Lalitpur" },
  { id: 4, name: "Anita", role: "UI Designer", city: "Bhaktapur" },
];

function App() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="app">
      <section className="directory">
        <div className="directory__header">
          <p className="eyebrow">React map practice</p>
          <h1>Student Directory</h1>
          <p>Search names and render matching user cards from an array.</p>
        </div>

        <label className="search-field">
          <span>Search users</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try Ram or Sita"
          />
        </label>

        <p className="result-count">
          Showing {filteredUsers.length} of {users.length} users
        </p>

        <div className="user-grid">
          {filteredUsers.map((user) => (
            <article className="user-card" key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.role}</p>
              <span>{user.city}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
