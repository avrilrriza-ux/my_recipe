import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetMealByIdQuery,
  useGetSeafoodMealsQuery,
} from "../features/mealApi";

function scaleMeasure(measure, baseServings, currentServings) {
  if (!measure) return "";

  const ratio = currentServings / baseServings;
  let updated = measure;

  updated = updated.replace(/\d+(\.\d+)?/g, (match) => {
    const num = parseFloat(match);
    const scaled = num * ratio;
    return Number.isInteger(scaled)
      ? String(scaled)
      : scaled.toFixed(2).replace(/\.00$/, "");
  });

  return updated;
}

function shuffleArray(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function RecipeDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetMealByIdQuery(id);
  const { data: seafoodData } = useGetSeafoodMealsQuery();

  const [servings, setServings] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [suggestedMeals, setSuggestedMeals] = useState([]);

  /* shown by default */
  const [showIngredients, setShowIngredients] = useState(true);
  const [showSteps, setShowSteps] = useState(true);

  const meal = data?.meals?.[0];
  const seafoodMeals = seafoodData?.meals || [];

  const ingredients = useMemo(() => {
    if (!meal) return [];

    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        items.push({
          ingredient: ingredient.trim(),
          measure: (measure || "").trim(),
        });
      }
    }
    return items;
  }, [meal]);

  useEffect(() => {
    const storedReviews =
      JSON.parse(localStorage.getItem("recipeReviews")) || {};
    setReviews(storedReviews[id] || []);
  }, [id]);

  useEffect(() => {
    if (!seafoodMeals.length || !id) return;

    const filtered = seafoodMeals.filter((item) => item.idMeal !== id);
    const randomThree = shuffleArray(filtered).slice(0, 3);
    setSuggestedMeals(randomThree);
  }, [seafoodMeals, id]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const roundedAverage = Math.round(averageRating);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!rating || !reviewTitle.trim() || !reviewText.trim()) {
      alert("Please complete the rating, title, and review.");
      return;
    }

    const newReview = {
      rating,
      title: reviewTitle,
      text: reviewText,
      date: new Date().toLocaleDateString(),
    };

    const storedReviews =
      JSON.parse(localStorage.getItem("recipeReviews")) || {};
    const updatedReviews = [...(storedReviews[id] || []), newReview];

    storedReviews[id] = updatedReviews;
    localStorage.setItem("recipeReviews", JSON.stringify(storedReviews));

    setReviews(updatedReviews);
    setRating(0);
    setReviewTitle("");
    setReviewText("");
    setShowModal(false);
  };

  if (isLoading) {
    return <h2 className="status-text">Loading recipe...</h2>;
  }

  if (isError || !meal) {
    return <h2 className="status-text">Recipe not found.</h2>;
  }

  return (
    <div className="detail-page">
      <div className="detail-top">
        <Link to="/" className="back-btn">
          ← Back to Recipes
        </Link>
      </div>

      <div className="detail-hero">
        <div className="detail-hero-text">
          <h1 className="detail-title">{meal.strMeal}</h1>

          <p className="detail-sub">
            {meal.strCategory} • {meal.strArea}
          </p>

          <div className="review-summary">
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= roundedAverage ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              type="button"
              className="review-link-btn"
              onClick={() => setShowModal(true)}
            >
              Write a review
            </button>

            <span className="review-count">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>

          <div className="servings-box">
            <span className="servings-label">Servings</span>
            <div className="servings-controls">
              <button
                className="serving-btn"
                onClick={() => setServings((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <span className="servings-count">{servings}</span>
              <button
                className="serving-btn"
                onClick={() => setServings((prev) => Math.min(12, prev + 1))}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="detail-image"
        />
      </div>

      <div className="detail-sections">
        <div className="ingredients-box">
          <div
            className="section-header"
            onClick={() => setShowIngredients((prev) => !prev)}
          >
            <h3>Ingredients</h3>
            <span className="toggle-btn">
              {showIngredients ? "⌄" : "›"}
            </span>
          </div>

          {showIngredients && (
            <div className="section-content open">
              <ul className="ingredients-list">
                {ingredients.map((item, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-number">{index + 1}</span>
                    <span>
                      <strong>{scaleMeasure(item.measure, 4, servings)}</strong>{" "}
                      {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="steps-box">
          <div
            className="section-header"
            onClick={() => setShowSteps((prev) => !prev)}
          >
            <h3>Cooking Instructions</h3>
            <span className="toggle-btn">
              {showSteps ? "⌄" : "›"}
            </span>
          </div>

          {showSteps && (
            <div className="section-content open">
              <div className="instructions-text">
                {meal.strInstructions
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((step, index) => (
                    <p key={index} className="instruction-step">
                      <span className="step-badge">{index + 1}</span>
                      <span>{step}</span>
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {suggestedMeals.length > 0 && (
        <div className="suggested-box">
          <h3>🍽 Suggested Recipes</h3>
          <div className="suggested-grid">
            {suggestedMeals.map((item) => (
              <div key={item.idMeal} className="suggested-card">
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className="suggested-image"
                />
                <div className="suggested-content">
                  <h4 className="suggested-title">{item.strMeal}</h4>
                  <Link to={`/recipe/${item.idMeal}`} className="suggested-btn">
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="review-section">
        {reviews.length === 0 ? (
          <div className="review-empty">
            <h2>Be the first to write a review</h2>
            <button
              className="review-main-btn"
              onClick={() => setShowModal(true)}
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="review-filled">
            <div className="review-filled-header">
              <h2>Reviews ({reviews.length})</h2>
              <button
                className="review-main-btn"
                onClick={() => setShowModal(true)}
              >
                Write a Review
              </button>
            </div>

            <div className="reviews-list">
              {reviews.map((review, index) => (
                <div key={index} className="single-review">
                  <div className="single-review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= review.rating ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <h4>{review.title}</h4>
                  <p>{review.text}</p>
                  <small>{review.date}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              type="button"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Write a Review</h2>

            <form onSubmit={handleSubmitReview}>
              <label className="modal-label">Overall Rating</label>
              <div className="modal-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= rating ? "modal-star active" : "modal-star"}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label className="modal-label">Review Title</label>
              <input
                type="text"
                className="modal-input"
                placeholder="Enter review title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />

              <label className="modal-label">Your Review</label>
              <textarea
                className="modal-textarea"
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailPage;