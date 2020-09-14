const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');


module.exports = {
    // getAll: function (req, res) {
    //     Movie.find(function (err, movies) {
    //         if (err) return res.status(400).json(err);
    //         res.json(movies);
    //     });
    // },
    getAll: function (req, res) {
        Movie.find({})
            .populate('actors')
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).json();
                res.json(movies);
            });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieID }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.params.actorID }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                let i = movie.actors.indexOf(actor._id);
                movie.actors.splice(i,1);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    getAllBetweenYears: function (req, res) {
        Movie.find({ year: {$gte: req.params.year2 }, year: {$lte: req.params.year1} })
            .populate('actors')
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).json();
                res.json(movies);
            });
    },
    // deleteAllBetweenYears: function (req, res) {
    //     Movie.find({ year: {$gte: req.params.year1 }, year: {$lte: req.params.year2} })
    //         .populate('actors')
    //         .exec(function (err, movies) {
    //             if (err) return res.status(400).json(err);
    //             if (!movies) return res.status(404).json();
    //             for (let i = 0; i < movies.length; i++) {
    //                 Movie.findOneAndRemove({ _id: movies[i]._id }, function (err) {
    //                     if (err) return res.status(400).json(err);
    //                     res.json();
    //                 });
    //             };
    //             res.json(movies);
    //         });
    // }
    deleteAllBetweenYears: function (req, res) {
        Movie.find({ year: {$gte: req.body.year2 }, year: {$lte: req.body.year1} })
            .populate('actors')
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).json();
                for (let i = 0; i < movies.length; i++) {
                    Movie.findOneAndRemove({ _id: movies[i]._id }, function (err) {
                        if (err) return res.status(400).json(err);
                        res.json();
                    });
                };
                res.json(movies);
            });
    }
};