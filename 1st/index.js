var gmail_from_homepage = document.getElementById("head-create-email")
var head_submit_email = document.getElementById("head-submit-email")

head_submit_email.addEventListener('click', function () {
    localStorage["gmail_from_homepage"] = gmail_from_homepage.value
    console.log(gmail_from_homepage.value)
});

// console.log(gmail_from_homepage.value)