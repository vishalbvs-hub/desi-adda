"use client";
import { useState } from "react";

export default function GatePage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F5F2EB", fontFamily: "'Source Sans 3', system-ui, sans-serif",
      padding: "20px",
    }}>
      <div style={{ textAlign: "center", maxWidth: "360px", width: "100%" }}>
        <div style={{ fontSize: "36px", fontWeight: 700, color: "#2D5A3D", marginBottom: "12px" }}>adda.</div>
        <p style={{ fontSize: "16px", color: "#6B6B6B", margin: "0 0 32px" }}>Something great is coming.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            style={{
              flex: 1, padding: "12px 16px", borderRadius: "8px",
              border: `1px solid ${error ? "#C44D3D" : "#E2DFD8"}`,
              fontSize: "14px", outline: "none", background: "white",
              fontFamily: "inherit",
            }}
          />
          <button type="submit" disabled={loading} style={{
            padding: "12px 20px", borderRadius: "8px",
            background: loading ? "#999" : "#2D5A3D", color: "white",
            border: "none", fontSize: "14px", fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
          }}>Enter</button>
        </form>
        {error && <p style={{ fontSize: "13px", color: "#C44D3D", marginTop: "10px" }}>Wrong password.</p>}
      </div>
    </div>
  );
}
