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
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/projectform`
        }
      });

      if (error) throw error;
      
      // Success will automatically redirect to GitHub
      console.log('Auth response:', data);
    } catch (error) {
      console.error('Error:', error);
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
