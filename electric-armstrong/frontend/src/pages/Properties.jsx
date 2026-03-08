import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { Search, MapPin, Home as HomeIcon, IndianRupee, Filter } from 'lucide-react';
import './Properties.css';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        propertyType: '',
        priceMin: '',
        priceMax: '',
        bedrooms: ''
    });

    const fetchProperties = async () => {
        const query = new URLSearchParams(filters).toString();
        const { data } = await axios.get(`http://localhost:5000/api/properties?${query}`);
        setProperties(data);
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProperties();
    };

    return (
        <div className="container properties-page">
            <h1 className="page-title">Browse <span className="gradient-text">Rental Properties</span></h1>
            
            <div className="filter-sidebar glass">
                <div className="filter-header">
                    <Filter size={20} />
                    <h3>Filters</h3>
                </div>
                <form className="filter-form" onSubmit={handleSearch}>
                    <div className="filter-group">
                        <label>Location</label>
                        <div className="input-with-icon">
                            <MapPin size={18} />
                            <input name="location" type="text" placeholder="e.g. Pune" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Property Type</label>
                        <div className="input-with-icon">
                            <HomeIcon size={18} />
                            <select name="propertyType" onChange={handleChange}>
                                <option value="">All Types</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Independent House">House</option>
                                <option value="PG">PG</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Price Range (₹)</label>
                        <div className="price-inputs">
                            <input name="priceMin" type="number" placeholder="Min" onChange={handleChange} />
                            <input name="priceMax" type="number" placeholder="Max" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Bedrooms</label>
                        <select name="bedrooms" onChange={handleChange}>
                            <option value="">Any BHK</option>
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                            <option value="4">4+ BHK</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Apply Filters</button>
                </form>
            </div>

            <div className="property-main">
                <div className="results-count">
                    Found <strong>{properties.length}</strong> properties matching your criteria
                </div>
                <div className="property-grid">
                    {properties.map(p => <PropertyCard key={p._id} property={p} />)}
                </div>
            </div>
        </div>
    );
};

export default Properties;
