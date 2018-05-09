let valid_account = false;
let valid_password = false;
let pwd_matched = false;
$("#email").keyup(function() {
  const email = $("#email").val();
  $.get('/user/find/' + email, function(user) {
    if (user < 0) {
      valid_account = true;
      $("#email_error").html('<p style="color:green;"> Account available</p>');
    } else {
      valid_account = false;
      $("#email_error").html('<p class="text-danger center"> Account exists!</p>');
    }
    setSubmitProp();
  })
});

$("#pwd").keyup(function() {
  const pwd = $("#pwd").val();
  if (pwd.length < 4) {
    valid_password = false;
    $("#pwd_error").html("Password must be at least 4 characters!");
  } else {
    valid_password = true;
    $("#pwd_error").html("");
  }
  setSubmitProp();
});

$("#confPwd").keyup(function() {
  const pwd = $("#pwd").val();
  const confPwd = $("#confPwd").val();

  if (pwd === confPwd) {
    pwd_matched = true;
    $("#conf_pwd_error").html("");
  } else {
    pwd_matched = false;
    $("#conf_pwd_error").html("Password NOT matched!");
  }
  setSubmitProp()
});

var setSubmitProp = function() {
  if (valid_account && valid_account && pwd_matched) {
    $("#createUser").prop('disabled', false);
  } else {
    $("#createUser").prop('disabled', true);
  }
}
