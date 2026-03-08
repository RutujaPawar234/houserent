import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Tenant'
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        try {
            await register(formData.name, formData.email, formData.phone, formData.password, formData.role);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form glass" onSubmit={handleSubmit}>
                <h2 className="gradient-text">Create Account</h2>
                <p>Join StayNest to find or list rental properties.</p>
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" type="text" onChange={handleChange} required placeholder="Rahul Sharma" />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" onChange={handleChange} required placeholder="rahul@example.com" />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" type="text" onChange={handleChange} required placeholder="9876543210" />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select name="role" onChange={handleChange} required>
                        <option value="Tenant">Tenant</option>
                        <option value="Owner">Property Owner</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input name="confirmPassword" type="password" onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login Here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
