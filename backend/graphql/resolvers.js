import mongoose from 'mongoose';
import courseModel from '../models/course';

const resolvers = {
    Query: {
        allCourses: (root, {
            searchTerm
        }) => {
            // return coursesData;
            if (searchTerm !== '') {
                return courseModel.find({
                    $text: {
                        $search: searchTerm
                    }
                }).sort({
                    voteCount: 'desc'
                })
            } else {
                return courseModel.find().sort({
                    voteCount: 'desc'
                });
            }
        },
        course: (root, {
            id
        }) => {
            // return coursesData.filter(course => {
            //     return course.id === id
            // })[0];
            return courseModel.findOne({
                id: id
            });
        }
    },
    Mutation: {
        upvote: (root, {
            id
        }) => {
            /*const course = coursesData.filter(course => {
                return course.id === id;
            })[0];
            course.voteCount++;
            return course;*/
            return courseModel.findOneAndUpdate({
                id: id
            }, {
                $inc: {
                    "voteCount": 1
                }
            }, {
                returnNewDocument: true
            });
        },
        downvote: (root, {
            id
        }) => {
            /*const course = coursesData.filter(course => {
                return course.id === id;
            })[0];
            course.voteCount--;
            return course;*/
            return courseModel.findOneAndUpdate({
                id: id
            }, {
                $inc: {
                    "voteCount": -1
                }
            }, {
                returnNewDocument: true
            });
        },
        addCourse: (root, {
            title,
            author,
            description,
            topic,
            url
        }) => {
            const course = new courseModel({
                title: title,
                author: author,
                description: description,
                topic: topic,
                url: url
            });
            return course.save();
        }
    }
}

export default resolvers;