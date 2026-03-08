const Contact = () => {
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', borderRadius: '12px' }}>
                <h1 className="gradient-text" style={{ marginBottom: '20px' }}>Contact Us</h1>
                <p style={{ marginBottom: '30px', color: '#666' }}>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                        <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Your Name" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="your@email.com" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                        <textarea style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none' }} placeholder="Your Message"></textarea>
                    </div>
                    <button type="button" className="btn btn-primary btn-block">Send Message</button>
                </form>
            </div>
        </div>
    );
};
export default Contact;
