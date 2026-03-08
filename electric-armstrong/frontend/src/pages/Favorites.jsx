import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { Heart, Trash2 } from 'lucide-react';
import './Dashboard.css';

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get('http://localhost:5000/api/favorites', config);
        setFavorites(res.data);
    };

    useEffect(() => {
        if (user) fetchFavorites();
    }, [user]);

    const handleRemoveFavorite = async (favId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/favorites/${favId}`, config);
            fetchFavorites();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container favorites-page">
            <h1 className="page-title"><Heart size={32} /> My <span className="gradient-text">Favorites</span></h1>
            
            {favorites.length > 0 ? (
                <div className="property-grid">
                    {favorites.map(fav => (
                        <div key={fav._id} className="fav-card-container">
                            <PropertyCard property={fav.property} />
                            <button className="remove-fav-btn" onClick={() => handleRemoveFavorite(fav._id)}>
                                <Trash2 size={20} /> Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Heart size={64} color="#ddd" />
                    <p>You haven't added any properties to your favorites yet.</p>
                    <a href="/properties" className="btn btn-primary">Browse Properties</a>
                </div>
            )}
        </div>
    );
};

export default Favorites;
