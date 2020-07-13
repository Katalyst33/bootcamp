const route = $.router;

route.path("/api/v1/courses", ()=>{

  route.get("/", "getAllCourses")
  route.get("/:courseId", "getOneCourse")

}).controller('Course')
