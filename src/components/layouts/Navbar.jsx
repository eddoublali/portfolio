import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Podcast, Menu, X } from "lucide-react";
import { supabase } from "../supabaseClient";

const Navbar = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle smooth scrolling for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  // Add auth state listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/projectform');
      } else if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      window.history.pushState({}, '', sectionId);
    }
  };

  const signInWithGitHub = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/projectform`
        }
      });
      
      if (error) throw error;
      
      // Handle successful sign-in
      if (data) {
        navigate('/projectform');
      }
    } catch (error) {
      console.error("Error signing in with GitHub:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigation items array for DRY code
  const navItems = [
    { id: 'Home', text: 'Accueil' },
    { id: 'About', text: 'À Propos' },
    { id: 'Experiences', text: 'Technologies' },
    { id: 'Projects', text: 'Projects' }
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link 
          to="/" 
          className="flex items-center font-bold text-2xl"
          onClick={(e) => handleNavClick(e, '#Home')}
        >
          <Podcast className="mr-2 w-8 h-8 text-accent" />
          Hedraf<span className="text-accent">tech</span>
        </Link>

        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="hover:text-accent transition-colors duration-200"
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
              >
                {item.text}
              </a>
            </li>
          ))}
          {user && (
            <li>
              <Link 
                to="/projectform" 
                className="hover:text-accent transition-colors duration-200"
              >
                Project Form
              </Link>
            </li>
          )}
        </ul>

        {/* User Authentication Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-accent transition-all duration-200"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.user_metadata?.avatar_url || "https://via.placeholder.com/40"}
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
              >
                <li>
                  <a className="justify-between hover:bg-accent/10">
                    Profile <span className="badge badge-accent">New</span>
                  </a>
                </li>
                <li><a className="hover:bg-accent/10">Settings</a></li>
                <li>
                  <button 
                    onClick={signOut}
                    className="hover:bg-accent/10 w-full text-left"
                    disabled={loading}
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button 
              onClick={signInWithGitHub} 
              className="btn btn-accent btn-sm hover:brightness-110 transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In with GitHub"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 p-4 space-y-4 animate-fadeIn">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block text-white hover:text-accent transition-colors duration-200"
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
              >
                {item.text}
              </a>
            </li>
          ))}
          {user && (
            <li>
              <Link 
                to="/projectform" 
                className="block text-white hover:text-accent transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Project Form
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <button 
                className="block text-white hover:text-accent w-full text-left transition-colors duration-200" 
                onClick={() => { 
                  signOut(); 
                  setIsOpen(false); 
                }}
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <button 
                className="block text-white hover:text-accent w-full text-left transition-colors duration-200" 
                onClick={() => { 
                  signInWithGitHub(); 
                  setIsOpen(false); 
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In with GitHub"}
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;