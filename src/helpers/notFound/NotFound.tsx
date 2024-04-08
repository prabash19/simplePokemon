import "./NotFound.css";
function NotFound() {
  return (
    <div className="notFoundContainer">
      <div className="notFoundMain">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <a href="/">Go back to homepage.</a>
      </div>
    </div>
  );
}

export default NotFound;
