import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Bed, Bath, Maximize, Heart, Check, Send, Home as HomeIcon, Clock, ShieldCheck, Map as MapIcon, Info } from 'lucide-react';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [message, setMessage] = useState('I am interested in this property. Please contact me.');
    const [success, setSuccess] = useState('');
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/properties/${id}`);
            setProperty(data);
        };
        fetchProperty();
    }, [id]);

    const handleSendRequest = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/requests', { propertyId: id, message }, config);
            setSuccess('Rental request sent successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFavorite = async () => {
        if (!user) {
            alert('Please login to add to favorites');
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/favorites', { propertyId: id }, config);
            alert('Added to favorites!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding to favorites');
        }
    };

    if (!property) return <div className="container loading">Loading...</div>;

    // Hardcoded additional info for demonstration since it's not in the model yet
    const houseRules = ["No Smoking", "Pets Small Only", "Family Preferred", "No Loud Music after 10 PM"];
    const nearbyPlaces = [
        { name: "City Public School", dist: "1.2 km" },
        { name: "Global Hospital", dist: "0.8 km" },
        { name: "Central Mall", dist: "2.5 km" },
        { name: "Metro Station", dist: "0.5 km" }
    ];

    return (
        <div className="container property-details-page">
            <div className="details-header">
                <div className="header-left">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> / <span>{property.title}</span>
                    </nav>
                    <h1>{property.title}</h1>
                    <p className="location"><MapPin size={18} /> {property.location}, India</p>
                    <div className="badge-row">
                        <span className="badge-item"><Clock size={14} /> Posted 2 days ago</span>
                        <span className="badge-item"><ShieldCheck size={14} /> Verified Listing</span>
                        <span className="badge-item">ID: {property._id.slice(-6).toUpperCase()}</span>
                    </div>
                </div>
                <div className="header-right">
                    <div className="price-tag">₹{property.price}<span>/mo</span></div>
                    <button className="btn btn-outline" onClick={handleFavorite}><Heart size={20} /> Save</button>
                </div>
            </div>

            <div className="image-gallery">
                <div className="main-image">
                    <img src={property.images[0] ? `http://localhost:5000${property.images[0]}` : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} alt={property.title} />
                </div>
                <div className="sub-images">
                    {property.images.slice(1, 3).length > 0 ? (
                        property.images.slice(1, 3).map((img, i) => (
                            <img key={i} src={`http://localhost:5000${img}`} alt={`view-${i}`} />
                        ))
                    ) : (
                        <>
                            <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="living" />
                            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="bedroom" />
                        </>
                    )}
                    <div className="more-images glass">
                        <span>+ 5 More</span>
                    </div>
                </div>
            </div>

            <div className="details-grid">
                <div className="details-main">
                    <section className="info-block glass card-shadow">
                        <div className="block-header"><Info size={20} /> <h3>Overview</h3></div>
                        <p className="description-text">{property.description}</p>
                        <hr />
                        <div className="stats-row">
                            <div className="stat-pill"><Bed size={18} /> <span>{property.bedrooms} Bed</span></div>
                            <div className="stat-pill"><Bath size={18} /> <span>{property.bathrooms} Bath</span></div>
                            <div className="stat-pill"><Maximize size={18} /> <span>{property.area} sqft</span></div>
                            <div className="stat-pill"><HomeIcon size={18} /> <span>{property.propertyType}</span></div>
                        </div>
                    </section>

                    <section className="info-block glass card-shadow">
                        <div className="block-header"><Check size={20} /> <h3>Amenities</h3></div>
                        <div className="amenities-grid">
                            {property.amenities.map((item, i) => (
                                <div key={i} className="amenity-pill"><ShieldCheck size={16} /> {item}</div>
                            ))}
                        </div>
                    </section>

                    <div className="two-col-grid">
                        <section className="info-block glass card-shadow">
                            <div className="block-header"><ShieldCheck size={20} /> <h3>House Rules</h3></div>
                            <ul className="rules-list">
                                {houseRules.map((rule, i) => (
                                    <li key={i}><Check size={14} color="var(--primary)" /> {rule}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="info-block glass card-shadow">
                            <div className="block-header"><MapIcon size={20} /> <h3>Nearby</h3></div>
                            <ul className="nearby-list">
                                {nearbyPlaces.map((place, i) => (
                                    <li key={i}>
                                        <span className="place-name">{place.name}</span>
                                        <span className="place-dist">{place.dist}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <section className="info-block glass card-shadow">
                        <div className="block-header"><h3>Rental Terms</h3></div>
                        <div className="terms-grid">
                            <div className="term-item">
                                <label>Security Deposit</label>
                                <p>₹{property.price * 2}</p>
                            </div>
                            <div className="term-item">
                                <label>Agreement Term</label>
                                <p>11 Months</p>
                            </div>
                            <div className="term-item">
                                <label>Notice Period</label>
                                <p>1 Month</p>
                            </div>
                            <div className="term-item">
                                <label>Electricity & Water</label>
                                <p>As per usage</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="details-sidebar">
                    <div className="sticky-sidebar">
                        <div className="owner-card glass card-shadow">
                            <h3>Listed By</h3>
                            <div className="owner-info">
                                <div className="owner-avatar premium-border">{property.owner.name[0]}</div>
                                <div>
                                    <h4>{property.owner.name}</h4>
                                    <p className="owner-badge">Registered Owner</p>
                                </div>
                            </div>

                            <div className="contact-reveal">
                                {showContact ? (
                                    <div className="revealed-info">
                                        <p><strong>Phone:</strong> {property.owner.phone}</p>
                                        <p><strong>Email:</strong> {property.owner.email}</p>
                                    </div>
                                ) : (
                                    <button className="btn btn-secondary btn-block" onClick={() => setShowContact(true)}>
                                        Reveal Contact Details
                                    </button>
                                )}
                            </div>
                            
                            <hr />
                            
                            <div className="request-form">
                                <h4>Interested? Send Request</h4>
                                {user ? (
                                    <form onSubmit={handleSendRequest}>
                                        {success && <div className="success-msg-inline">{success}</div>}
                                        <textarea 
                                            value={message} 
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Introduce yourself to the owner..."
                                            rows="4"
                                        ></textarea>
                                        <button type="submit" className="btn btn-primary btn-block">
                                            <Send size={18} /> Request to Rent
                                        </button>
                                    </form>
                                ) : (
                                    <div className="login-prompt">
                                        <p>Please <Link to="/login" className="link-text">Login</Link> to message the owner and schedule a visit.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="safety-card glass">
                            <h4>Safety Tips</h4>
                            <ul>
                                <li>Always visit the property in person.</li>
                                <li>Never pay deposit before signing agreement.</li>
                                <li>Verify owner documents carefully.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
