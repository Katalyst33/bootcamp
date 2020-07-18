const route = $.router;

route.path("/api/v1/courses", ()=>{

  route.get("/", "getAllCourses")
  route.get("/:courseId", "getOneCourse")
  route.get("/", "addCourse")
  route.put("/:courseId", "updateCourse")
  route.get("/:courseId/course-review", "CourseReview@getCourseReviews");
  route.post("/:courseId/course-review", "CourseReview@addCourseReview");
  route.post("/:courseId/enrollment","Enrollment@addEnrollment");
  route.delete("/:courseId", "deleteCourse")


}).controller('Course')
