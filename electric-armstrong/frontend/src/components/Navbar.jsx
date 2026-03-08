import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Search, Heart, User, LogOut, SquarePlus, LayoutDashboard } from 'lucide-react';
import './Navbar.css';
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <span className="gradient-text">StayNest</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-item"><Home size={20} /> Home</Link>
                    <Link to="/properties" className="nav-item"><Search size={20} /> Properties</Link>
                    <Link to="/about" className="nav-item">About</Link>
                    <Link to="/contact" className="nav-item">Contact</Link>
                </div>
                <div className="nav-actions">
                    {user ? (
                        <>
                            {user.role === 'Owner' ? (
                                <>
                                    <Link to="/owner-dashboard" className="nav-item"><LayoutDashboard size={20} /> Dashboard</Link>
                                    <Link to="/add-property" className="nav-item"><SquarePlus size={20} /> Add Property</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/tenant-dashboard" className="nav-item"><LayoutDashboard size={20} /> Dashboard</Link>
                                    <Link to="/favorites" className="nav-item"><Heart size={20} /> Favorites</Link>
                                </>
                            )}
                            <div className="user-info">
                                <User size={20} />
                                <span>{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="btn-logout"><LogOut size={20} /></button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
