function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>🍳 Cooking Mama Recipe App</h3>

        <p className="footer-text">
          Discover delicious seafood recipes and start cooking today!
        </p>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Recipes</a>
          <a href="#">Contact</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Cooking Mama. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;