import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Home, Send, Trash2, CircleCheck, CircleX } from 'lucide-react';
import './Dashboard.css';
const OwnerDashboard = () => {
    const { user } = useAuth();
    const [myProperties, setMyProperties] = useState([]);
    const [requests, setRequests] = useState([]);
    const fetchData = async () => {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const resProps = await axios.get(`${apiUrl}/api/properties/myproperties`, config);
        const resReqs = await axios.get(`${apiUrl}/api/requests/owner`, config);
        setMyProperties(resProps.data);
        setRequests(resReqs.data);
    };
    useEffect(() => {
        if (user) fetchData();
    }, [user]);
    const handleStatusUpdate = async (reqId, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.put(`${apiUrl}/api/requests/${reqId}`, { status }, config);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteProperty = async (propId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                await axios.delete(`${apiUrl}/api/properties/${propId}`, config);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div className="container dashboard-page">
            <h1 className="page-title"><LayoutDashboard size={32} /> Owner <span className="gradient-text">Dashboard</span></h1>
            
            <div className="dashboard-stats">
                <div className="stat-card glass">
                    <h3>{myProperties.length}</h3>
                    <p>Total Properties</p>
                </div>
                <div className="stat-card glass">
                    <h3>{requests.length}</h3>
                    <p>Rental Requests</p>
                </div>
                <div className="stat-card glass">
                    <h3>{requests.filter(r => r.status === 'Pending').length}</h3>
                    <p>Pending Requests</p>
                </div>
            </div>
            <div className="dashboard-grid">
                <section className="dashboard-section">
                    <h3>My Listed Properties</h3>
                    <div className="dashboard-list">
                        {myProperties.map(prop => (
                            <div key={prop._id} className="list-item glass">
                                <div className="item-info">
                                    <Home size={20} />
                                    <div>
                                        <h4>{prop.title}</h4>
                                        <p>{prop.location} • ₹{prop.price}/mo</p>
                                    </div>
                                </div>
                                <div className="item-actions">
                                    <button onClick={() => handleDeleteProperty(prop._id)} className="btn-icon delete"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="dashboard-section">
                    <h3>Incoming Rental Requests</h3>
                    <div className="dashboard-list">
                        {requests.map(req => (
                            <div key={req._id} className="list-item glass">
                                <div className="item-info">
                                    <div className="tenant-avatar">{req.tenant.name[0]}</div>
                                    <div>
                                        <h4>{req.tenant.name}</h4>
                                        <p>For: {req.property.title}</p>
                                        <p className="req-msg">"{req.message}"</p>
                                    </div>
                                </div>
                                <div className="item-status">
                                    <span className={`status-badge ${req.status.toLowerCase()}`}>{req.status}</span>
                                    {req.status === 'Pending' && (
                                        <div className="status-actions">
                                            <button onClick={() => handleStatusUpdate(req._id, 'Approved')} className="btn-icon approve"><CircleCheck size={18} /></button>
                                            <button onClick={() => handleStatusUpdate(req._id, 'Rejected')} className="btn-icon reject"><CircleX size={18} /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
export default OwnerDashboard;
