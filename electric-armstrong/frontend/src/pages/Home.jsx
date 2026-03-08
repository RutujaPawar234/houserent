import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { Search, MapPin, Home as HomeIcon, IndianRupee } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState({ location: '', type: '', budget: '' });

    useEffect(() => {
        const fetchProperties = async () => {
            const { data } = await axios.get('http://localhost:5000/api/properties');
            setProperties(data.slice(0, 4)); // Show first 4 properties
        };
        fetchProperties();
    }, []);

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">Find Your Next <span className="gradient-text">Perfect Home</span></h1>
                    <p className="hero-subtitle">Search from thousands of verified rental properties across the country.</p>
                    
                    <div className="search-bar glass">
                        <div className="search-input">
                            <MapPin size={20} />
                            <input type="text" placeholder="Location (City or Area)" />
                        </div>
                        <div className="search-input">
                            <HomeIcon size={20} />
                            <select>
                                <option value="">Property Type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="House">Independent House</option>
                            </select>
                        </div>
                        <div className="search-input">
                            <IndianRupee size={20} />
                            <input type="number" placeholder="Budget" />
                        </div>
                        <button className="btn btn-primary"><Search size={20} /> Search</button>
                    </div>
                </div>
            </section>

            <section className="container featured-section">
                <div className="section-header">
                    <h2>Featured Properties</h2>
                    <p>Hand-picked recently added properties just for you.</p>
                </div>
                <div className="property-grid">
                    {properties.map(p => <PropertyCard key={p._id} property={p} />)}
                </div>
                <div className="center-btn">
                    <Link to="/properties" className="btn btn-outline">View All Properties</Link>
                </div>
            </section>

            <section className="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2>How It Works</h2>
                        <p>Finding a home has never been this easy.</p>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Search Properties</h3>
                            <p>Browse through our wide range of apartments, villas, and houses.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>View Details</h3>
                            <p>Check images, amenities, and location details of your choice.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Contact Owner</h3>
                            <p>Directly message the owner to schedule a visit or ask questions.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">04</div>
                            <h3>Rent the House</h3>
                            <p>Finalize the details and move into your new dream home.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
