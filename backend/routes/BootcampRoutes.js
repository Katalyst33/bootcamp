const route = $.router;

route.path("/api/v1/bootcamps", () => {

  route.get("/", "getAllBootcamps");
  route.get("/:bootcampId", "getOneBootcamp");
  route.get("/:bootcampId/courses", "Course@getBootcampCourses");
  route.post("/", "createBootcamp");
  route.delete("/:bootcampId","deleteBootcamp" )


}).controller('Bootcamp');
