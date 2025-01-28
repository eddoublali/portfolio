// Navbar.jsx
import { Podcast } from "lucide-react";

import { supabase } from "../supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-dom";

const Navbar = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signInWithGitHub = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/projectform`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with GitHub:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/" className="flex items-center font-bold text-3xl md:text-xl">
         <Podcast className="mr-2" />
        Hedraf<span className="text-accent">tech</span> 
      
      </Link>

      {!user ? (
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/#Home" className="btn btn-sm btn-ghost">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/#About" className="btn btn-sm btn-ghost">
              A Propos
            </Link>
          </li>
          <li>
            <Link to="/#Experiences" className="btn btn-sm btn-ghost">
              les Technologies
            </Link>
          </li>
          <li>
            <Link to="/#Projects" className="btn btn-sm btn-ghost">
              Les Projects
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/projectform" className="btn btn-sm btn-ghost">
              Project Form
            </Link>
          </li>
          <li>
            <Link to="/project" className="btn btn-sm btn-ghost">
              Project
            </Link>
          </li>
          <li>
            <Link to="/" className="btn btn-sm btn-ghost">
              Acceuil
            </Link>
          </li>
        </ul>
      )}

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {user.user_metadata?.full_name || user.email}
            </span>
            <button
              onClick={signOut}
              className="btn btn-error btn-sm"
              disabled={loading}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGitHub}
            className="btn btn-primary btn-sm"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In with GitHub"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;