import react from "react"; // React
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Components
import NavBar from "./main/components/Nav/NavBar"; // NavBar
import Header from "./main/components/Header/Header"; // Header
import Footer from "./main/components/Footer/Footer"; // Footer
import Error from "./main/components/Error/Error"; // Error

// Pages
import Home from "./main/pages/Home";
import About from "./main/pages/About";
import Search from "./main/pages/Search";

// RouteLayout
const RouteLayout = () => {
  // Location
  const location = useLocation();

  // Map pathnames to header text
  const headerTitles = {
    "/": "ERROR",
    "/home": "HOME",
    "/about": "ABOUT",
    "/search": "SEARCH"
  };

  const headerText = headerTitles[location.pathname] || "DEFAULT";

  // Return
  return (
    <div>
      {/* Header */}
      <Header HeaderText={headerText} />

      {/* Routes */}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const App = () => {
  // Return
  return (
    <BrowserRouter>
      <div className="App">
        {/* Nav */}
        <NavBar />

        {/* Routes */}
        <RouteLayout />
      </div>
    </BrowserRouter>


  );
}

// Export
export default App;
