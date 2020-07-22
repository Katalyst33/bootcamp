const route = $.router;


route.path("/api/v1/cart", () => {

  route.get("/", "getUserCart");
  route.post("/", "addCart");
  route.put("/:id", "updateCart");

}).controller("Cart");
