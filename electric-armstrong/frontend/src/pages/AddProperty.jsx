import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, X, Upload } from 'lucide-react';
import './AddProperty.css';

const AddProperty = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        propertyType: 'Apartment',
        bedrooms: '',
        bathrooms: '',
        area: '',
        amenities: [],
        images: []
    });
    const [uploading, setUploading] = useState(false);

    const amenitiylist = ['WiFi', 'Parking', 'Balcony', 'Power Backup', 'Water Supply', 'Security', 'Lift', 'Gym'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAmenityChange = (amenity) => {
        if (formData.amenities.includes(amenity)) {
            setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
        } else {
            setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const data = new FormData();
        files.forEach(file => data.append('images', file));

        setUploading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, images: [...formData.images, ...res.data] });
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/properties', formData, config);
            navigate('/owner-dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container add-property-page">
            <h1 className="page-title">Add New <span className="gradient-text">Property</span></h1>
            
            <form className="add-property-form glass" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label>Property Title</label>
                        <input name="title" type="text" placeholder="e.g. 3BHK Villa in Baner" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" placeholder="Describe your property..." onChange={handleChange} required></textarea>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Rent Price (₹ / month)</label>
                        <input name="price" type="number" placeholder="25000" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input name="location" type="text" placeholder="Baner, Pune" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Property Type</label>
                        <select name="propertyType" onChange={handleChange}>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Independent House">Independent House</option>
                            <option value="PG">PG</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Bedrooms</label>
                        <input name="bedrooms" type="number" placeholder="3" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Bathrooms</label>
                        <input name="bathrooms" type="number" placeholder="2" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Area Size (sq ft)</label>
                        <input name="area" type="number" placeholder="1500" onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Amenities</h3>
                    <div className="amenities-selection">
                        {amenitiylist.map(amenity => (
                            <label key={amenity} className={`amenity-label ${formData.amenities.includes(amenity) ? 'active' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={formData.amenities.includes(amenity)}
                                    onChange={() => handleAmenityChange(amenity)}
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Images</h3>
                    <div className="image-upload-area">
                        <label className="upload-btn">
                            <Upload size={24} />
                            <span>Upload Images</span>
                            <input type="file" multiple onChange={handleImageUpload} hidden />
                        </label>
                        {uploading && <p>Uploading...</p>}
                        <div className="preview-grid">
                            {formData.images.map((img, i) => (
                                <div key={i} className="preview-item">
                                    <img src={`http://localhost:5000${img}`} alt="preview" />
                                    <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})}><X size={14}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-large">List My Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
