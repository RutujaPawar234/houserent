const About = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center', maxWidth: '800px' }}>
            <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '30px' }}>About StayNest</h1>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.8' }}>
                StayNest is a modern online house rental platform designed to make finding and listing rental homes a seamless experience. 
                Our mission is to bridge the gap between property owners and potential tenants through a secure, transparent, and easy-to-use interface.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '60px' }}>
                <div>
                    <h3 style={{ marginBottom: '15px' }}>Verified Listings</h3>
                    <p style={{ fontSize: '14px', color: '#777' }}>Every property is manually reviewed to ensure quality and authenticity.</p>
                </div>
                <div>
                    <h3 style={{ marginBottom: '15px' }}>Direct Contact</h3>
                    <p style={{ fontSize: '14px', color: '#777' }}>Chat directly with owners without any middleman or hidden fees.</p>
                </div>
                <div>
                    <h3 style={{ marginBottom: '15px' }}>Smart Filters</h3>
                    <p style={{ fontSize: '14px', color: '#777' }}>Find exactly what you need with our advanced search capabilities.</p>
                </div>
            </div>
        </div>
    );
};
export default About;
