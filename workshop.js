addTeacher: function (req, res) {
    Student.findOne({ _id: req.params.sId }, function (err, student) {
        if (err) return res.status(400).json(err);
        if (!student) return res.status(404).json();
        Teacher.findOne({ _id: req.params.tId }, function (err, teacher) {
            if (err) return res.status(400).json(err);
            if (!teacher) return res.status(404).json();
            student.teachers.push(teacher._id);
            student.save(function (err) {
                if (err) return res.status(500).json(err);
                res.send("Done");
            });
        })
    });
}

/*
The code is for information entered through a form in a page's body, not a query like in the URL.
This can be fixed if:
 -  the post request is sent with a form in the body.
 -  the code is changed to accept queries
    e.g. req.query.fullName
The URL is posting to '/teachers' but the code is for '/'. Changing one to match the other will fix it.
e.g. app.post('/teachers'...) or http://localhost:8080/?fullName=...
*/

/*
POST request is used for creating resources.
PUT request is used for updating resources, and creating them if they do not exist.
So you would use PUT request if you needed to update a database resource that had already been created.

Stateless architecture means no information is retained by either the sender or receiver.
*/