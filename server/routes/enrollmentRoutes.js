const route = $.router;


route.path("/api/v1/enrollments", ()=>{

  route.post("/", "addEnrollment")

}).controller('Enrollment')
