import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Heart, Send, CheckCircle, Clock } from 'lucide-react';
import './Dashboard.css';

const TenantDashboard = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const fetchData = async () => {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const resReqs = await axios.get('http://localhost:5000/api/requests/tenant', config);
        const resFavs = await axios.get('http://localhost:5000/api/favorites', config);
        setRequests(resReqs.data);
        setFavorites(resFavs.data);
    };

    useEffect(() => {
        if (user) fetchData();
    }, [user]);

    return (
        <div className="container dashboard-page">
            <h1 className="page-title"><LayoutDashboard size={32} /> Tenant <span className="gradient-text">Dashboard</span></h1>
            
            <div className="dashboard-stats">
                <div className="stat-card glass">
                    <h3>{requests.length}</h3>
                    <p>Sent Requests</p>
                </div>
                <div className="stat-card glass">
                    <h3>{favorites.length}</h3>
                    <p>Favorite Homes</p>
                </div>
                <div className="stat-card glass">
                    <h3>{requests.filter(r => r.status === 'Approved').length}</h3>
                    <p>Approved Requests</p>
                </div>
            </div>

            <div className="dashboard-grid">
                <section className="dashboard-section">
                    <h3>My Rental Requests</h3>
                    <div className="dashboard-list">
                        {requests.map(req => (
                            <div key={req._id} className="list-item glass">
                                <div className="item-info">
                                    <Clock size={20} />
                                    <div>
                                        <h4>{req.property.title}</h4>
                                        <p>₹{req.property.price}/mo • {req.property.location}</p>
                                        <p className="req-msg">"{req.message}"</p>
                                    </div>
                                </div>
                                <div className="item-status">
                                    <span className={`status-badge ${req.status.toLowerCase()}`}>{req.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="dashboard-section">
                    <h3>Recent Saved Properties</h3>
                    <div className="dashboard-list">
                        {favorites.slice(0, 5).map(fav => (
                            <div key={fav._id} className="list-item glass">
                                <div className="item-info">
                                    <Heart size={20} className="active-heart" />
                                    <div>
                                        <h4>{fav.property.title}</h4>
                                        <p>₹{fav.property.price}/mo • {fav.property.location}</p>
                                    </div>
                                </div>
                                <div className="item-actions">
                                    <a href={`/property/${fav.property._id}`} className="btn btn-outline btn-small">View</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TenantDashboard;
