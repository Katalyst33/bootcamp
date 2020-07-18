const route = $.router;

route.path("/api/v1/course-reviews", () => {

  route.get("/", "getAllReviews");
  route.get("/:reviewId", "getCourseReviews");
  route.post("/:courseId", "addCourseReview");
  route.delete("/:reviewId", "deleteCourseReview");


}).controller("CourseReview");
