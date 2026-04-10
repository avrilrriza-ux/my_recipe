import { Link } from "react-router-dom";

function RecipeCard({ meal }) {
  const storedReviews =
    JSON.parse(localStorage.getItem("recipeReviews")) || {};

  const recipeReviews = storedReviews[meal.idMeal] || [];

  const averageRating =
    recipeReviews.length === 0
      ? 0
      : recipeReviews.reduce((sum, review) => sum + review.rating, 0) /
        recipeReviews.length;

  const roundedAverage = Math.round(averageRating);

  return (
    <div className="recipe-card">
      <div className="recipe-image-wrap">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-image"
        />
      </div>

      <div className="recipe-content">
        <div className="top-content">
          <h3 className="recipe-title">{meal.strMeal}</h3>

          <div className="recipe-review-block">
            <div className="recipe-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= roundedAverage ? "star filled" : "star"}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="review-count">
              ({recipeReviews.length}{" "}
              {recipeReviews.length === 1 ? "review" : "reviews"})
            </p>
          </div>
        </div>

        <div className="cook-btn-wrap">
          <Link to={`/recipe/${meal.idMeal}`} className="cook-btn">
            Let&apos;s Cook!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;