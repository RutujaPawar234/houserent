import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, ArrowRight } from 'lucide-react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <div className="property-image">
                <img src={property.images[0] ? `http://localhost:5000${property.images[0]}` : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={property.title} />
                <div className="property-price">₹{property.price}<span>/mo</span></div>
            </div>
            <div className="property-info">
                <div className="property-type">{property.propertyType}</div>
                <h3>{property.title}</h3>
                <p className="property-location"><MapPin size={16} /> {property.location}</p>
                <div className="property-details">
                    <span><Bed size={18} /> {property.bedrooms} Beds</span>
                    <span><Bath size={18} /> {property.bathrooms} Baths</span>
                </div>
                <Link to={`/property/${property._id}`} className="btn btn-outline btn-full">
                    View Details <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
