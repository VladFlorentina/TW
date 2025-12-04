const express = require("express");
const application = express();
const port = process.env.PORT || 8080;

const sequelize = require("./sequelize");

const University = require("./models/university");
const Student = require("./models/student");
const Course = require("./models/course");
const { noExtendRight } = require("sequelize/dist/lib/operators");

University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, { through: "enrollements" });
Course.belongsToMany(Student, { through: "enrollements" });

application.use(
    express.urlencoded({
        extended: true,
    })
);
application.use(express.json());

application.listen(port, () => {
    console.log(`The server is running on http://localhost: ${port}.`);
});

application.use((error, request, response, next) => {
    console.error(`[ERROR]: ${error}`);
    response.status(500).json(error);
});


application.put("/", async (request, response, next) => {
    try {
        await sequelize.sync({ force: true });
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});


application.get("/universities", async (request, response, next) => {
    try {
        const universities = await University.findAll();
        if (universities.length > 0) {
            response.json(universities);
        } else {
            response.sendStatus(204);
        }
    } catch (error) {
        next(error);
    }
});


application.post("/universities", async (request, response, next) => {
    try {
        const university = await University.create(request.body);
        response.status(201).location(university.id).send();
    } catch (error) {
        next(error);
    }
});


application.get("/universities/:universityId/students", async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const students = await university.getStudents();
            if (students.length > 0) {
                response.json(students);
            } else {
                response.sendStatus(204);
            }

        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.post("/universities/:universityId/students", async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const student = await Student.create(request.body);
            university.addStudent(student);
            await university.save();
            response.status(201).location(student.id).send();
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.get('/universities/:universityId/students/:studentId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId)
        if (university) {
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            if (student) {
                request.json(student);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.put('/universities/:universityId/students/:studentId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            if (student) {
                await student.update(request.body);
                response.status(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.delete('/universities/:universityId/students/:studentId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            if (student) {
                await student.destroy();
                response.sendStatus(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.get('/universities/:universityId/courses', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const courses = await university.getCourses();
            if (courses.length > 0) {
                response.json(courses);
            } else {
                response.sendStatus(204);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

application.get('/university/:universityId/courses/:courseId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            if (course) {
                response.json(course);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.post('/universities/:universityId/courses', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const course = await Course.create(request.body);
            university.addCourse(course);
            await university.save();
            response.status(201).location(course.id).send();
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.put('/universities/:universityId/courses/:courseId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            if (course) {
                await course.update(request.body);
                response.sendStatus(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.delete('/universities/:universityId/courses/:courseId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            if (course) {
                await course.destroy();
                response.sendStatus(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

application.post('/universities/:universityId/students/:studentId/enrollements/:courseId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            if (student && course) {
                student.addCourse(course);
                student.save();
                response.sendStatus(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.delete('/universities/:universityId/students/:studentId/enrollements/:courseId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            if (student && course) {
                student.removeFromCourse(course);
                student.save();
                response.sendStatus(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.get('/universities/:universityId/students/:studentId/enrollements', async (request, response, next) => {
    try {
        const student = await Student.findOne({
            where: {
                id: request.params.studentId,
                universityId: request.params.universityId
            }
        });

        if (student) {
            const courses = await student.getCourses();

            if (courses.length > 0) {
                response.status(200).json(courses);
            } else {
                response.sendStatus(204);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.post('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            if (course && student) {
                course.addStudent(student);
                course.save();
                response.sendStatus(204);
            } else {
                response.sendStatus(400);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.delete('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (request, response, next) => {
    try {
        const university = await University.findByPk(request.params.universityId);
        if (university) {
            const courses = await university.getCourses({ id: request.params.courseId });
            const course = courses.shift();
            const students = await university.getStudents({ id: request.params.studentId });
            const student = students.shift();
            if (student && course) {
                course.removeStudent(student);
                course.save();
                response.sendStatus(204);
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});


application.post('/', async (request, response, next) => {
    try {
        const registry = {};
        for (let u of request.body) {
            const university = await University.create(u);
            for (let s of u.students) {
                const student = await Student.create(s);
                registry[s.key] = student;
                university.addStudent(student);
            }
            for (let c of u.courses) {
                const course = await Course.create(c);
                registry[c.key] = course;
                university.addCourse(course);
            }
            for (let e of u.enrollements) {
                registry[e.courseKey].addStudent(registry[e.studentKey]);
                await registry[e.courseKey].save();
            }
            await university.save();
        }
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

application.get('/', async (request, response, next) => {
    try {
        const result = [];
        
        const universities = await University.findAll();

        for (let u of universities) {
            const university = {
                name: u.universityName, 
                students: [],
                courses: [],
                enrollements: []
            };

            const courses = await u.getCourses();
            for (let c of courses) {
                university.courses.push({
                    key: c.id,
                    name: c.name
                });

                const enrolledStudents = await c.getStudents();
                for (let s of enrolledStudents) {
                    university.enrollements.push({
                        courseKey: c.id,
                        studentKey: s.id
                    });
                }
            }

            const students = await u.getStudents();
            for (let s of students) {
                university.students.push({
                    key: s.id,
                    fullName: s.studentFullName, 
                    status: s.studentStatus      
                });
            }

            result.push(university);
        }

        if (result.length > 0) {
            response.status(200).json(result);
        } else {
            response.sendStatus(204);
        }
    } catch (error) {
        next(error);
    }
});





// const express = require("express");
// const app = express();
// const port = 3000;


// const sequelize = require("./sequelize");

// const University = require("./models/university");
// const Student = require("./models/student");

// University.hasMany(Student);

// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );
// app.use(express.json());

// app.listen(port, () => {
//     console.log("The server is running on http://localhost:" + port);
// });

// app.use((err, req, res, next) => {
//     console.error("[ERROR]:" + err);
//     res.status(500).json({ message: "500 - Server Error" });
// });


// app.get("/create", async (req, res, next) => {
//     try {
//         await sequelize.sync({ force: true });
//         res.status(201).json({ message: "Database created with the models." });
//     } catch (err) {
//         next(err);
//     }
// });


// app.get("/universities", async (req, res, next) => {
//     try {
//         const universities = await University.findAll();
//         res.status(200).json(universities);
//     } catch (err) {
//         next(err);
//     }
// });


// app.post("/university", async (req, res, next) => {
//     try {
//         await University.create(req.body);
//         res.status(201).json({ message: "Univeristy Created!" });
//     } catch (err) {
//         next(err);
//     }
// });


// app.get("/students", async (req, res, next) => {
//     try {
//         const students = await Student.findAll();
//         res.status(200).json(students);
//     } catch (err) {
//         next(err);
//     }
// });


// app.get("/universities/:universityId/students", async (req, res, next) => {
//     try {
//         const university = await University.findByPk(req.params.universityId, {
//             include: [Student],
//         });
//         if (university) {
//             res.status(200).json(university.students);
//         } else {
//             res.status(404).json({ message: "404 - University Not Found!" });
//         }
//     } catch (err) {
//         next(err);
//     }
// });


// app.post("/universities/:universityId/students", async (req, res, next) => {
//     try {
//         const university = await University.findByPk(req.params.universityId);
//         if (university) {
//             const student = new Student(req.body);
//             student.universityId = university.id;
//             await student.save();
//             res.status(201).json({ message: "Student created" });
//         } else {
//             res.status(404).json({ message: "404 - University Not Found!" });
//         }
//     } catch (err) {
//         next(err);
//     }
// });


// app.get('/universities/:universityId/students/:studentId', async (req, res, next) => {
//     try {
//         const university = await University.findByPk(req.params.universityId)
//         if (university) {
//             const students = await university.getStudents({ id: req.params.studentId })
//             const student = students.shift()
//             if (student) {
//                 res.status(202).json(student)
//             } else {
//                 res.status(404).json({ message: '404 - Student Not Found!' })
//             }
//         } else {
//             res.status(404).json({ message: '404 - University Not Found!' })
//         }
//     } catch (err) {
//         next(err);
//     }
// });


// app.put('/universities/:universityId/students/:studentId', async (req, res, next) => {
//     try {
//         const university = await University.findByPk(req.params.universityId)
//         if (university) {
//             const students = await university.getStudents({ id: req.params.studentId })
//             const student = students.shift()
//             if (student) {
//                 student.studentFullName = req.body.fullName
//                 student.studentStatus = req.body.status
//                 await student.save()
//                 res.status(202).json({ message: 'Student updated!' })
//             } else {
//                 res.status(404).json({ message: '404 - Student Not Found!' })
//             }
//         } else {
//             res.status(404).json({ message: '404 - University Not Found!' })
//         }
//     } catch (err) {
//         next(err);
//     }
// });


// app.delete('/universities/:universityId/students/:studentId', async (req, res, next) => {
//     try {
//         const result = await Student.destroy({
//             where: {
//                 id: req.params.studentId,
//                 universityId: req.params.universityId
//             }
//         });

//         if (result > 0) {
//             res.status(202).json({ message: 'Student deleted!' });
//         } else {
//             res.status(404).json({ message: 'Student not found!' });
//         }
//     } catch (err) {
//         next(err);
//     }
// });




// const express = require("express");
// const app = express();
// const port = 3000;

// const sequelize = require("./sequelize");

// const University = require("./models/university");
// const Student = require("./models/student");

// University.hasMany(Student);

// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );
// app.use(express.json());

// app.listen(port, () => {
//     console.log("The server is running on http://localhost:" + port);
// });

// app.use((err, req, res, next) => {
//     console.error("[ERROR]:" + err);
//     res.status(500).json({ message: "500 - Server Error" });
// });


// app.get("/create", async (req, res, next) => {
//     try {
//         await sequelize.sync({ force: true });
//         res.status(201).json({ message: "Database created with the models." });
//     } catch (err) {
//         next(err);
//     }
// });


// app.get("/universities", async (req, res, next) => {
//     try {
//         const universities = await University.findAll();
//         res.status(200).json(universities);
//     } catch (err) {
//         next(err);
//     }
// });


// app.post("/university", async (req, res, next) => {
//     try {
//         await University.create(req.body);
//         res.status(201).json({ message: "Univeristy Created!" });
//     } catch (err) {
//         next(err);
//     }
// });


// app.get("/students", async (req, res, next) => {
//     try {
//         const students = await Student.findAll();
//         res.status(200).json(students);
//     } catch (err) {
//         next(err);
//     }
// });


// app.get("/universities/:universityId/students", async (req, res, next) => {
//     try {
//         const university = await University.findByPk(req.params.universityId, {
//             include: [Student],
//         });
//         if (university) {
//             res.status(200).json(university.students);
//         } else {
//             res.status(404).json({ message: "404 - University Not Found!" });
//         }
//     } catch (err) {
//         next(err);
//     }
// });


// app.post("/universities/:universityId/students", async (req, res, next) => {
//     try {
//         const university = await University.findByPk(req.params.universityId);
//         if (university) {
//             const student = new Student(req.body);
//             student.universityId = university.id;
//             await student.save();
//             res.status(201).json({ message: "Student created" });
//         } else {
//             res.status(404).json({ message: "404 - University Not Found!" });
//         }
//     } catch (err) {
//         next(err);
//     }
// });

// app.get("/universities/:universityId/students/:studentId", async (req, res, next) => {
//     try {
//         const student = await Student.findOne({
//             where: {
//                 id: req.params.studentId,
//                 universityId: req.params.universityId,
//             },
//         });

//         if (student) {
//             res.status(200).json(student);
//         } else {
//             res.status(404).json({ message: "Student not found!" });
//         }
//     } catch (err) {
//         next(err);
//     }
// });
