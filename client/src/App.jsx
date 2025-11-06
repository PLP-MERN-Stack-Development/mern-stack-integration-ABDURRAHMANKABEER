import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import MyPosts from "./pages/MyPosts";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./layout/DashboardLayout";

import { useAuth } from "./context/AuthContext";
import PublicNavbar from "./components/PublicNavbar";

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <div>Access Denied</div>;
  return children;
}

function App() {

  return (
    <Router>
      <PublicNavbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<DashboardLayout title="Home"><Home /></DashboardLayout>} />
          <Route path="/posts/:id" element={<DashboardLayout title="Post Details"><PostDetails /></DashboardLayout>} />
          <Route path="/categories" element={<DashboardLayout title="Categories"><Categories /></DashboardLayout>} />
          <Route path="/category/:name" element={<DashboardLayout title="Category Posts"><CategoryPosts /></DashboardLayout>} />


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

          {/* Dashboard and Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <DashboardLayout title="Admin Dashboard">
                  <AdminDashboard />
                </DashboardLayout>
              </AdminRoute>
            }
          />

          {/* Posts */}
          <Route
            path="/create-post"
            element={
              <ProtectedRoute roles={["admin", "author"]}>
                <DashboardLayout title="Create Post">
                  <CreatePost />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-post/:id"
            element={
              <ProtectedRoute roles={["admin", "author"]}>
                <DashboardLayout title="Edit Post">
                  <EditPost />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-posts"
            element={
              <ProtectedRoute roles={["author", "admin"]}>
                <DashboardLayout title="My Posts">
                  <MyPosts />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
