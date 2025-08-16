const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('✅ MongoDB connected')
        // try {
        //     await mongoose.connection.db.collection('courses').drop(); // name in lowercase
        //     console.log('🗑️ "courses" collection dropped');
        // } catch (err) {
        //     if (err.code === 26) {
        //         console.log('ℹ️ "courses" collection does not exist');
        //     } else {
        //         console.error('❌ Error dropping collection:', err);
        //     }
        // }
    })
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
    purchasedCources: [{
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