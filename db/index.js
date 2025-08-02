const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB
mongoose.connection.collection('Cources').drop();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchaseCources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    imgLink: String,
    price : Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Courses = mongoose.model('Courses', CourseSchema);

module.exports = {
    Admin,
    User,
    Courses
}