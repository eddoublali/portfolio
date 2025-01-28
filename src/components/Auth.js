// components/Auth.js
import { supabase } from "./supabaseClient";
import { useState } from "react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Redirect to GitHub OAuth sign-in
      const { user, error } = await supabase.auth.signIn(
        { provider: "github" },
        { redirectTo: window.location.origin }
      );

      if (error) throw error;
      // Here, you can handle the user data (set the user in state, etc.)
      console.log(user);
    } catch (error) {
      setError("Error signing in with GitHub: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="text-3xl">Sign in with GitHub</h2>
      <button
        onClick={handleGitHubSignIn}
        className="btn btn-primary mt-4"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign in with GitHub"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
