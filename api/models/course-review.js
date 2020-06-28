const mongoose = require("mongoose");

const CourseReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
  },
  text: {
    type: String,
    required: [true, "Please add a some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 5"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});


//prevent user from submitting more than one review per course
CourseReviewSchema.index({ course: 1, user: 1 }, { unique: true });

// static method to get the average and save

CourseReviewSchema.statics.getAverageRating = async function (courseId) {
  const obj = await this.aggregate([
    {
      $match: { course: courseId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  try {
    await this.model("Course").findByIdAndUpdate(courseId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

//Call getAverageCost after Save
CourseReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.course);
});
//call getAveragecost before remove
CourseReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.course);
});

module.exports = mongoose.model("Course-Review", CourseReviewSchema);
