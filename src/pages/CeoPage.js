import AdminDashboard from "../components/AdminDashboard";
import { useAuth } from "../auth/AuthContext";
import CeoControlCenter from "../components/CeoControlCenter";

export default function CeoPage() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>CEO Control Center 🚀</h1>
      <CeoControlCenter />
      <AdminDashboard />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
