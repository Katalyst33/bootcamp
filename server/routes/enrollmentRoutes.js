const route = $.router;


route.path("/api/v1/enrollments", ()=>{

  route.post("/", "addEnrollment")
  route.get("/", "getAllEnrollments")
  route.get("/user", "getUserEnrollments")
  route.delete("/:enrollmentId", "removeEnrollment")

}).controller('Enrollment')
