import { Navigate } from "react-router";
import { pagePaths } from "./pagePaths";

/**
 * Wraps routes that require authentication.
 * When isLoggedIn is false, redirects to the login page.
 */
export default function ProtectedRoute({ isLoggedIn = true, children }) {
  if (!isLoggedIn) {
    return <Navigate to={pagePaths.login} replace />;
  }
  return children;
}
