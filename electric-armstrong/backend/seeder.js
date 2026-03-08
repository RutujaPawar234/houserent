const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Property = require('./models/propertyModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await Property.deleteMany();
        await User.deleteMany();

        const owner = await User.create({
            name: 'John Doe',
            email: 'owner@example.com',
            phone: '9876543210',
            password: 'password123',
            role: 'Owner'
        });

        const tenant = await User.create({
            name: 'Jane Smith',
            email: 'tenant@example.com',
            phone: '1234567890',
            password: 'password123',
            role: 'Tenant'
        });

        await Property.create([
            {
                owner: owner._id,
                title: 'High-end Modern Apartment',
                description: 'A beautiful modern apartment with glass balconies and sunset views.',
                price: 15000,
                location: 'Pune',
                propertyType: 'Apartment',
                bedrooms: 2,
                bathrooms: 2,
                area: 1200,
                amenities: ['WiFi', 'Parking', 'Security'],
                images: ['/uploads/apartment.png']
            },
            {
                owner: owner._id,
                title: 'Luxury Garden Villa',
                description: 'Spacious villa with a private pool and lush green garden.',
                price: 45000,
                location: 'Mumbai',
                propertyType: 'Villa',
                bedrooms: 4,
                bathrooms: 4,
                area: 3500,
                amenities: ['Pool', 'Garden', 'Gym'],
                images: ['/uploads/villa.png']
            },
            {
                owner: owner._id,
                title: 'Cozy Independent House',
                description: 'Charming suburban home with a white picket fence.',
                price: 12000,
                location: 'Bangalore',
                propertyType: 'Independent House',
                bedrooms: 3,
                bathrooms: 2,
                area: 1800,
                amenities: ['WiFi', 'Parking', 'Balcony'],
                images: ['/uploads/house.png']
            },
            {
                owner: owner._id,
                title: 'Minimalist Studio Loft',
                description: 'Modern studio loft with huge windows and minimalist decor.',
                price: 8000,
                location: 'Delhi',
                propertyType: 'Apartment',
                bedrooms: 1,
                bathrooms: 1,
                area: 600,
                amenities: ['WiFi', 'Power Backup'],
                images: ['/uploads/studio.png']
            }
        ]);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
