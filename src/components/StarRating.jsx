function StarRating({ rating = 0 }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "20px",
            color: star <= rating ? "#d2692f" : "#d3d3d3",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;