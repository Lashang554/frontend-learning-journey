"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Counter App</h1>

      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>
        ➕ Increase
      </button>

      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
        ➖ Decrease
      </button>
    </div>
  );
}