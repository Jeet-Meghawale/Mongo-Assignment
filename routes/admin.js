const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Courses } = require("../db")
const { z } = require("zod");


const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    imgLink: z.string().url("Must be a valid URL"),
    price: z.number().positive("Price must be a positive number")
});

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;


    Admin.create({
        username: username,
        password: password
    })
        .then(function () {
            res.json({
                message: 'Admin created successfully'
            })
        })
        .catch(function (err) {
            res.json({
                err
            })
        })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const parseData = courseSchema.parse(req.body);
        const { title, description, imgLink, price } = parseData;

        const newCourse = await Courses.create({
            title,
            description,
            imgLink,
            price
        });

        res.json({
            message: 'Course created successfully', courseId: newCourse._id
        })
    } catch (err) {
        console.error("Error details:", err);  // 🔍 View actual error

        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors });
        }

        res.status(500).json({ error: "Internal server error" });
    }



});

router.get('/courses',  async (req, res) => {
    // Implement fetching all courses logic
    const response = await Courses.find({});
    res.json(response)
});

module.exports = router;