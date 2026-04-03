import { useMemo, useState } from "react";
import { useGetSeafoodMealsQuery } from "../features/mealApi";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

function HomePage() {
  const { data, isLoading, isError } = useGetSeafoodMealsQuery();

  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const meals = data?.meals || [];
  const recipesPerPage = 9;

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesSearch = meal.strMeal
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "All" ||
        meal.strMeal.toLowerCase().includes(category.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [meals, searchTerm, category]);

  const totalPages = Math.ceil(filteredMeals.length / recipesPerPage);

  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <h2 className="status-text">Loading recipes...</h2>;
  }

  if (isError) {
    return <h2 className="status-text">Oops! Failed to load recipes.</h2>;
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-inner">
          
          <h1 className="hero-title">Seafood Recipes</h1>
          <p className="hero-subtitle">
            Discover a variety of seafood dishes made simple. Browse recipes, explore ingredients, and follow step-by-step instructions to create delicious meals at home.
            🍳
          </p>
         
        </div>
        <div className="hero-wave"></div>
        
      </header>

      <main className="main-content">
        <section className="recipes-section">
        
          <h2 className="section-title">What would you like to cook?</h2>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
          />
          

          <div className="category-buttons">
            {["All", "Fried", "Grilled", "Steamed", "Baked", "Soup"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`category-btn ${
                    category === cat ? "active" : ""
                  }`}
                  onClick={() => {
                    setCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {filteredMeals.length === 0 ? (
            <p className="empty-text">No recipe found.</p>
          ) : (
            <>
              <div className="recipe-grid">
                {paginatedMeals.map((meal) => (
                  <RecipeCard key={meal.idMeal} meal={meal} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
            
          )}
          <footer className="footer">
  <p>© 2026 Seafood Recipes</p>
</footer>
        </section>
      </main>
    </div>
  );
}

export default HomePage;