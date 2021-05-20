// TODO: Make sure the center content doesn't intersect the security and personal pannels css problem
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAohkpWoFrFVdrKKUKXB2-iU2MkNVAaUWM",
    authDomain: "ethioshare-f13bf.firebaseapp.com",
    projectId: "ethioshare-f13bf",
    storageBucket: "ethioshare-f13bf.appspot.com",
    messagingSenderId: "225389897373",
    appId: "1:225389897373:web:761eab1640226178301674",
    measurementId: "G-7N289P22GB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const dbf = firebase.firestore();
const dbs = firebase.storage();


// Start of More Options and profile settings
const more_options_container = document.getElementsByClassName("more-options-container")[0]
const more_options_btn = document.getElementsByClassName("more-options-btn")[0]
const profile_settings_container = document.getElementsByClassName("profile-settings-container")[0]
const profile_picture = document.getElementsByClassName("profile-picture")[0]

profile_picture.addEventListener("click", () => {
    if (profile_settings_container.style.display == "none") {
        profile_settings_container.style.display = "block"
        more_options_container.style.display = "none"
    } else if (profile_settings_container.style.display == "block") {
        // TODO: Fix not display none after icon click

        profile_settings_container.style.display = "none"
    }
    document.addEventListener('mouseup', function (e) {
        if (!profile_settings_container.contains(e.target)) {
            profile_settings_container.style.display = 'none';
        }
    })

})


more_options_btn.addEventListener("click", () => {
    if (more_options_container.style.display == "none") {
        profile_settings_container.style.display = "none"
        more_options_container.style.display = "block"
    } else if (more_options_container.style.display == "block") {
        // TODO: Fix not display none after icon click
        more_options_container.setAttribute("style", "display: none;")
    }
    document.addEventListener('mouseup', function (e) {
        if (!more_options_container.contains(e.target)) {
            more_options_container.style.display = 'none';
        }
    })
})

var seller;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(firebase.auth().currentUser)
        dbf.collection("users").doc(user.uid).get().then((doc) => {
            seller = doc.data().seller
            if (seller) {
                const newListElement = document.createElement("li")
                newListElement.innerHTML = "Buyers Requests"

                more_options_container.insertBefore(newListElement, more_options_container.children[1])
                newListElement.addEventListener("click", () => {
                    window.location.href = "../3rth/buyer_requests.html"
                })
            }
        })
    }
});

const all_companies = more_options_container.children[0]
all_companies.addEventListener("click", () => {
    window.location.href = "../3rth/all_companies.html"
})

// End of More Options and profile settings

// Start email
const profile_settings_email = document.getElementsByClassName("profile-settings-email")[0]
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const email = user.email
        profile_settings_email.innerHTML = email
    }
})
// End email

// Start of Name
const profile_settings_name = document.getElementsByClassName("profile-settings-name")[0]

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(firebase.auth().currentUser)
        dbf.collection("users").doc(user.uid).get().then((doc) => {
            const firstName = doc.data().firstName
            const lastName = doc.data().lastName
            profile_settings_name.innerHTML = firstName + " " + lastName
        })
    }
});
// End of Name

// Start of profile pic change
const profile_settings_camera_icon = document.getElementsByClassName("profile-settings-camera-icon")[0]
const proflie_settings_profilepicture = document.getElementsByClassName("proflie-settings-profilepicture")[0]
const profile_settings_profilepicture_input = document.getElementById("profile-settings-profilepicture-input")
const profile_picture_nav = document.getElementById("profile-picture-nav")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const photoid = auth.currentUser.uid
        const ref = dbs.ref()
        ref.child("user_profile_pictures/" + photoid).getDownloadURL().then((url) => {
            proflie_settings_profilepicture.setAttribute("style", `background-image: url(${url})`)
            profile_picture_nav.setAttribute("style", `background-image: url(${url})`)
        }).catch(() => {
            proflie_settings_profilepicture.setAttribute("style", "background-image: url('place-holder-pp.png')")
            profile_picture_nav.setAttribute("style", "background-image: url('place-holder-pp.png')")
        })

    }
})

profile_settings_camera_icon.addEventListener("click", () => {
    profile_settings_profilepicture_input.click()
})

profile_settings_profilepicture_input.addEventListener("change", handleProfilePicture, false)

function handleProfilePicture(e) {
    const file = profile_settings_profilepicture_input.files[0]
    const photoid = auth.currentUser.uid
    const ref = dbs.ref()
    const metatype = {
        contentType: file.type
    }

    const task = ref.child("user_profile_pictures/" + photoid).put(file, metatype)
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            proflie_settings_profilepicture.setAttribute("style", `background-image: url(${url})`)
            profile_picture_nav.setAttribute("style", `background-image: url(${url})`)
        })
}
// End of profile pic change

// Verify me start
const profile_settings_li_normal_verify = document.getElementsByClassName("profile-settings-li-normal")[0]
profile_settings_li_normal_verify.addEventListener("click", () => {
    window.location.href = "verify_me.html"
})
// Verify me end

// Start of home bottom
const home_btn = document.getElementsByClassName("home-btn")[0]
home_btn.addEventListener("click", () => {
    window.location.href = "main-page.html"
})
// End of home button

// Start of manage profile picture set
const basic_info_type_profile_picture = document.getElementsByClassName("basic-info-type-profile-picture")[0]
const basic_info_type_profile_picture_icon = document.getElementsByClassName("basic-info-types")[0]
const basic_info_type_profile_picture_input = document.getElementById("basic-info-type-profile-picture-input")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const photoid = auth.currentUser.uid
        const ref = dbs.ref()
        ref.child("user_profile_pictures/" + photoid).getDownloadURL().then((url) => {
            basic_info_type_profile_picture.setAttribute("style", `background-image: url(${url})`)
        }).catch(() => {
            basic_info_type_profile_picture.setAttribute("style", "background-image: url('place-holder-pp.png')")
        })

    }
})

basic_info_type_profile_picture_icon.addEventListener("click", () => {
    basic_info_type_profile_picture_input.click()
})

basic_info_type_profile_picture_input.addEventListener("change", handleManageProfilePicture, false)

function handleManageProfilePicture(e) {
    const file = basic_info_type_profile_picture_input.files[0]
    const photoid = auth.currentUser.uid
    const ref = dbs.ref()
    const metatype = {
        contentType: file.type
    }

    const task = ref.child("user_profile_pictures/" + photoid).put(file, metatype)
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            basic_info_type_profile_picture.setAttribute("style", `background-image: url(${url})`)
            proflie_settings_profilepicture.setAttribute("style", `background-image: url(${url})`)
            profile_picture_nav.setAttribute("style", `background-image: url(${url})`)
        })
}
// End of manage profile picture set

// Start of manage name
const basic_info_type_value_name = document.getElementsByClassName("basic-info-type-value")[1]

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(firebase.auth().currentUser)
        dbf.collection("users").doc(user.uid).get().then((doc) => {
            const firstName = doc.data().firstName
            const lastName = doc.data().lastName
            basic_info_type_value_name.innerHTML = firstName + " " + lastName
        })
    }
});
// End of manage name

// TODO: Password last changed node.js

// Start of signout option
var profile_settings_li_normal = document.getElementsByClassName("profile-settings-li-normal")[1]
profile_settings_li_normal.addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "../1st/index.html"
    })
})
// End of signout option

// Start check which is selected in side options
const personal_info = document.getElementsByClassName("side-option")[0]
const security = document.getElementsByClassName("side-option")[1]
const about = document.getElementsByClassName("side-option")[2]
const personal_info_container = document.getElementsByClassName("personal-info-container")[0]
const security_container = document.getElementsByClassName("personal-info-container")[1]

personal_info.addEventListener("click", () => {
    if (personal_info.classList[1] != "selected") {
        security.removeAttribute("class")
        security.setAttribute("class", "side-option")
        personal_info.setAttribute("class", "side-option selected")
        security_container.style.display = "none"
        personal_info_container.style.display = "block";
    }
})

security.addEventListener("click", () => {
    if (security.classList[1] != "selected") {
        personal_info.removeAttribute("class")
        personal_info.setAttribute("class", "side-option")
        security.setAttribute("class", "side-option selected")
        security_container.style.display = "block"
        personal_info_container.style.display = "none";
    }
})
// End check which is selected in side options


auth.onAuthStateChanged(function (user) {
    if (user) {
        const basic_info_type_value1 = document.getElementsByClassName("basic-info-type-value")[5]
        basic_info_type_value1.innerHTML += auth.currentUser.email
    }
});

// Start on linking buttons to another page
const basic_info_type_name = document.getElementsByClassName("basic-info-types")[1]
const basic_info_type_birthday = document.getElementsByClassName("basic-info-types")[2]
const basic_info_type_gender = document.getElementsByClassName("basic-info-types")[3]
const basic_info_type_password = document.getElementsByClassName("basic-info-types")[4]
const basic_info_type_security_password = document.getElementsByClassName("basic-info-types")[5]
const basic_info_type_security_2fa = document.getElementsByClassName("basic-info-types")[6]
const basic_info_type_contact_email = document.getElementById("basic-info-type-contact-email")
const basic_info_type_contact_phone = document.getElementById("basic-info-type-contact-phone")


basic_info_type_name.addEventListener("click", () => {
    localStorage['clickedValue'] = "Name"
    window.location.href = "profile-settings-detail.html"
})

basic_info_type_username.addEventListener("click", () => {
    localStorage['clickedValue'] = "Username"
    window.location.href = "profile-settings-detail.html"
})

basic_info_type_birthday.addEventListener("click", () => {
    localStorage['clickedValue'] = "Birthday"
    window.location.href = "profile-settings-detail.html"
})

basic_info_type_gender.addEventListener("click", () => {
    localStorage['clickedValue'] = "Gender"
    window.location.href = "profile-settings-detail.html"
})

basic_info_type_password.addEventListener("click", () => {
    localStorage['verificationValue'] = "password"
    window.location.href = "verification_page.html"
})

basic_info_type_contact_email.addEventListener("click", () => {
    localStorage['clickedValue'] = "Email"
    window.location.href = "profile-settings-detail.html"
})

basic_info_type_contact_phone.addEventListener("click", () => {
    localStorage['clickedValue'] = "Phone"
    window.location.href = "profile-settings-detail.html"
})

basic_info_type_security_password.addEventListener("click", () => {
    localStorage['verificationValue'] = "password"
    window.location.href = "verification_page.html"
})

basic_info_type_security_2fa.addEventListener("click", () => {
    localStorage['verificationValue'] = "2fa"
    console.log(auth.currentUser)
    if (auth.currentUser.emailVerified) {
        window.location.href = "verification_page.html"
    } else {
        swal("Oops...", "You must verify your email before trying to activate 2FA", "error").then((value) => {
            if (value == true) {
                swal("Email Verification", "Click the button below to get a verification link!", "info", {
                    button: "Send link"
                }).then((secValue) => {
                    if (secValue == true) {
                        auth.currentUser.sendEmailVerification()
                        swal("Sent", "Verification link was sent to your email", "success")
                    }
                })
            }
        })
    }
})
// End on linking buttons to another page