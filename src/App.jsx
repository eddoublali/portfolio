import { Navigate, Outlet } from "react-dom";
import { useState, useEffect } from "react";
import { supabase } from "./components/supabaseClient";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error.message);
          return;
        }
        console.log("Session from supabase:", session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state change:", session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect logic
  if (user && window.location.pathname === '/') {
    return <Navigate to="/projectform" replace />;
  }
  
  if (user && window.location.pathname === '/signup') {
    return <Navigate to="/projectform" replace />;
  }
  
  if (!user && window.location.pathname === '/projectform') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <div className="flex-grow p-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;