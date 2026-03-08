# StayNest - Smart House Rental Platform

StayNest is a full-stack MERN application that connects property owners with tenants. It features a modern, responsive UI, role-based dashboards, property management, and a rental request system.

## 🚀 Key Features

- **User Authentication**: Secure JWT-based login and registration for Owners and Tenants.
- **Property Management**: Owners can list properties with details, amenities, and images.
- **Advanced Search**: Filter properties by location, type, budget, and bedrooms.
- **Rental Request System**: Tenants can send requests; Owners can manage them (Approve/Reject).
- **Favorites**: Tenants can save properties to their personalized favorites list.
- **Modern UI**: Built with React, featuring glassmorphism and smooth animations.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, Lucide-React, CSS3 (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, BcryptJS
- **Media Handling**: Multer (Local Storage)

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd staynest
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 📸 Demo Data
To seed the database with sample properties and users:
```bash
cd backend
node seeder.js
```

## 📜 License
This project is licensed under the MIT License.
