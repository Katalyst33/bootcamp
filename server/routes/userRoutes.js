const route = $.router;

route.path("/api/v1/users", ()=>{

  route.get("/", "getAllUsers")
  route.get("/:userId", "getUser")
  route.put("/:userId", "updateUser")
  route.delete("/:userId","deleteUser")

}).controller('User')
