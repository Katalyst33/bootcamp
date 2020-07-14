const route = $.router;

route.path("/api/v1/courses", ()=>{

  route.get("/", "getAllCourses")
  route.get("/:courseId", "getOneCourse")
  route.get("/", "addCourse")
  route.put("/:courseId", "updateCourse")
  route.delete("/:courseId", "deleteCourse")


}).controller('Course')
