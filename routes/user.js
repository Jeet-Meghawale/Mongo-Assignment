const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Courses } = require("../db")


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
        const password = req.body.password;
    
    
        User.create({
            username: username,
            password: password
        })
            .then(function () {
                res.json({
                    message: 'User created successfully'
                })
            })
            .catch(function (err) {
                res.json({
                    err
                })
            })
    
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Courses.find({});
    res.json(response)
});
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const username = req.headers.username;

        const result = await User.updateOne(
            { username: username },
            { $push: { purchasedCources: courseId } }
        );

            res.json({ msg: "Course added successfully" });
        
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err.message });
    }
});



router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router