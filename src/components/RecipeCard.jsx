import { Link } from "react-router-dom";

function RecipeCard({ meal }) {
  return (
    <div className="recipe-card">
      <div className="recipe-image-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{meal.strMeal}</h3>

        <Link to={`/recipe/${meal.idMeal}`} className="cook-btn">
          Let&apos;s Cook! 
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;