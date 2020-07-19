const route = $.router;

route.path("/api/v1/bootcamps", () => {

  route.get("/", "getAllBootcamps");
  route.post("/", "createBootcamp");

  route.get("/:bootcampId", "getOneBootcamp");
  route.get("/:bootcampId/courses", "Course@getBootcampCourses");
  route.post("/:bootcampId/courses", "Course@addCourse");
  route.delete("/:bootcampId", "deleteBootcamp");
  route.put("/:bootcampId", "updateBootcamp");
  route.put("/:bootcampId/photo", "uploadBootcampPhoto");


}).controller("Bootcamp");
