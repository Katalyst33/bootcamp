const route = $.router;

route.path("/api/v1/course-reviews", () => {

  route.get("/", "getAllReviews");
  route.get("/user-reviews", "getUserCourseReviews");

  route.get("/:reviewId", "getOneCourseReview");

  route.post("/:courseId", "addCourseReview");
  route.put("/:reviewId", "updateCourseReview");
  route.delete("/:reviewId", "deleteCourseReview");

}).controller("CourseReview");
