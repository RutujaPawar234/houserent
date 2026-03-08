import './Footer.css';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>StayNest</h3>
                    <p>Find your perfect home with StayNest. We connect property owners and tenants seamlessly.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/properties">Properties</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p><Mail size={16} /> info@staynest.com</p>
                    <p><Phone size={16} /> +91 98765 43210</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <Facebook size={20} />
                        <Twitter size={20} />
                        <Instagram size={20} />
                        <Linkedin size={20} />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 StayNest. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
