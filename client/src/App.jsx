import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/AdminDashboard";
import EditPost from "./pages/EditPost";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import MyPosts from "./pages/MyPosts";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          {/* Guest only */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/create-post"
            element={
              <ProtectedRoute roles={["admin", "author"]}>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-post/:id"
            element={
              <ProtectedRoute roles={["admin", "author"]}>
                <EditPost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-posts"
            element={
              <ProtectedRoute roles={["author"]}>
                <MyPosts />
              </ProtectedRoute>
            }
          />

          {/* Public */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:name" element={<CategoryPosts />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
