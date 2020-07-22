// const errorHandler = require("../api/middleware/error");

const route = $.router;
// $.app.use(errorHandler);

// route.get("/api/v1/bootcamps", "Bootcamp@index");

require("./routes/BootcampRoutes");
require("./routes/courseRoutes")
require("./routes/userRoutes")
require("./routes/courseReviewRoute")
require("./routes/enrollmentRoutes")
require("./routes/authRoutes");
require("./routes/cartRoutes");

route.get("*", ({ res }) => {
  res.sendFile($.path.base("dist/index.html"));
});
