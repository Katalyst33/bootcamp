const route = $.router;
route.path("/api/v1/auth", () => {

  route.get("@me");
  route.post("@login");
  route.get("@logout");
  route.post("@register");
  route.put("updatedetails","updateDetails");
  route.put("updatepassword","updatePassword");
  route.post("forgotpassword","forgotPassword");


}).controller('Auth');
