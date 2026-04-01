import { Star } from "lucide-react";

export default function StarRating({ rating, reviews }) {
  if (!rating) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" }}>
      <div style={{ display: "flex", gap: "1px" }}>
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} size={12} fill={i <= Math.floor(rating) ? "#C4943D" : "#E2DFD8"} color={i <= rating ? "#C4943D" : "#E2DFD8"} />
        ))}
      </div>
      <span style={{ fontWeight: 600, color: "#1A1A1A" }}>{rating}</span>
      {reviews && <span style={{ color: "#6B6B6B" }}>({reviews.toLocaleString()})</span>}
    </div>
  );
}
