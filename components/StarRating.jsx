import { Star } from "lucide-react";

export default function StarRating({ rating, reviews }) {
  if (!rating) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" }}>
      <div style={{ display: "flex", gap: "1px" }}>
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i} size={12}
            fill={i <= Math.floor(rating) ? "#F59E0B" : "#E0D8CF"}
            color={i <= rating ? "#F59E0B" : "#E0D8CF"}
          />
        ))}
      </div>
      <span style={{ fontWeight: 600, color: "#5A4A3F" }}>{rating}</span>
      {reviews && <span style={{ color: "#A89888" }}>({reviews.toLocaleString()})</span>}
    </div>
  );
}
