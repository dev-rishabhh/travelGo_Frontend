import Link from 'next/link';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Holiday Vibes</h3>
            <p className="footer-description">
              Your trusted partner for unforgettable adventures.
              Experience the beauty of the World with our expert guides.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📧</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tours">Tours</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Popular Tours</h4>
            <ul className="footer-links">
              <li><a href="#">Everest Base Camp</a></li>
              <li><a href="#">Annapurna Circuit</a></li>
              <li><a href="#">Langtang Valley</a></li>
              <li><a href="#">Chitwan Safari</a></li>
              <li><a href="#">Cultural Heritage</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Ayodhya, UP, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+977-1-4444-444</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@holidaytoursandtravel.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Hoilday Vibesl. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
