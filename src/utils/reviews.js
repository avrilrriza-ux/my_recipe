export function getAllReviews() {
  const data = localStorage.getItem("recipeReviews");
  return data ? JSON.parse(data) : {};
}

export function getReviewById(mealId) {
  const reviews = getAllReviews();
  return reviews[mealId] || null;
}

export function saveReview(mealId, reviewData) {
  const reviews = getAllReviews();
  reviews[mealId] = reviewData;
  localStorage.setItem("recipeReviews", JSON.stringify(reviews));
}