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
// End of More Options

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
        }).catch((e) => { })

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
        }).catch((e) => { })
}
// End of profile pic change

// Start of going to manage account page
const profile_settings_manage = document.getElementsByClassName("profile-settings-manage")[0]
profile_settings_manage.addEventListener("click", () => {
    window.location.href = "manage-acc.html"
})
// End of going to manage account page

// Start of signout option
var profile_settings_li_normal = document.getElementsByClassName("profile-settings-li-normal")[1]
profile_settings_li_normal.addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "../1st/index.html";
    }).catch((e) => { })
})
// End of signout option

value = localStorage["verificationValue"]
const main_profile_settings_container = document.getElementById("main-profile-settings-container")

if (value == "password") {

    const HTML = `        <div class="name-settings-title-container">
            <div class="name-settings-title"><i class="fa fa-arrow-left" id="name-settings-title-icon"></i>Password
            </div>
        </div>
        <div class="personal-info-container">
            <div class="personal-info">
                <div class="basic-info-container container">
                    <div class="head-intro">
                        <p class="head-additonal-info settings-head-additonal-info">Choose a strong password and don't
                            reuse it for other accounts.
                        </p>
                    </div>
                    <div class="basic-info">
                        <div class="basic-info-title settings-basic-info-title">Change password</div>
                        <div class="create-acc-content password">
                            <input class="create-acc-content-form-input" type="password" placeholder="Old Password">
                            <i class="fa fa-eye field-icon show"></i>
                            <i class="fa fa-eye-slash field-icon hide" style="display: none;"></i>
                        </div>
                        <div class="create-acc-content">
                            <input class="create-acc-content-form-input" type="password" placeholder="New Password">
                            <i class="fa fa-eye field-icon-i show"></i>
                            <i class="fa fa-eye-slash field-icon-i hide" style="display: none;"></i>
                        </div>
                        <div class="create-acc-content">
                            <input class="create-acc-content-form-input" type="password" placeholder="Confirm Password">
                            <i class="fa fa-eye field-icon-i show"></i>
                            <i class="fa fa-eye-slash field-icon-i hide" style="display: none;"></i>
                        </div>
                        <div class="create-acc-content">
                            <p id="create-acc-empty-field"></p>
                        </div>
                        <div class="settings-create-acc-confirm-button-container">
                            <div class="settings-create-acc-confirm-button"> Cancel
                            </div>
                            <div class="settings-create-acc-confirm-button"> Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    main_profile_settings_container.innerHTML = HTML

    const create_acc_content_form_input = document.getElementsByClassName("create-acc-content-form-input")
    var show_icon = document.getElementsByClassName("show")
    var hide_icon = document.getElementsByClassName("hide")

    show_icon[0].addEventListener("click", () => {
        create_acc_content_form_input[0].setAttribute("type", "text")

        show_icon[0].style.display = "none"
        hide_icon[0].style.display = "inline-block"
    })

    hide_icon[0].addEventListener("click", () => {
        create_acc_content_form_input[0].setAttribute("type", "password")

        show_icon[0].style.display = "inline-block"
        hide_icon[0].style.display = "none"
    })

    show_icon[1].addEventListener("click", () => {
        create_acc_content_form_input[1].setAttribute("type", "text")

        show_icon[1].style.display = "none"
        hide_icon[1].style.display = "inline-block"
    })

    hide_icon[1].addEventListener("click", () => {
        create_acc_content_form_input[1].setAttribute("type", "password")

        show_icon[1].style.display = "inline-block"
        hide_icon[1].style.display = "none"
    })

    show_icon[2].addEventListener("click", () => {
        create_acc_content_form_input[2].setAttribute("type", "text")

        show_icon[2].style.display = "none"
        hide_icon[2].style.display = "inline-block"
    })

    hide_icon[2].addEventListener("click", () => {
        create_acc_content_form_input[2].setAttribute("type", "password")

        show_icon[2].style.display = "inline-block"
        hide_icon[2].style.display = "none"
    })


    const create_acc_content_form_input_old = document.getElementsByClassName("create-acc-content-form-input")[0]
    const create_acc_content_form_input_new = document.getElementsByClassName("create-acc-content-form-input")[1]
    const create_acc_content_form_input_new_confirm = document.getElementsByClassName("create-acc-content-form-input")[2]
    const create_acc_empty_field = document.getElementById("create-acc-empty-field")
    const settings_create_acc_cancel_button = document.getElementsByClassName("settings-create-acc-confirm-button")[0]
    const settings_create_acc_save_button = document.getElementsByClassName("settings-create-acc-confirm-button")[1]

    function onPressListener() {
        settings_create_acc_save_button.style.backgroundColor = "rgb(55, 109, 247)"
        settings_create_acc_save_button.innerHTML = "Changing"

        if (create_acc_content_form_input_new.value == "" || create_acc_content_form_input_old.value == "" || create_acc_content_form_input_new_confirm.value == "") {
            create_acc_empty_field.innerHTML = "None of the fields can be empty"
            settings_create_acc_save_button.innerHTML = "Save"
            settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            return 1
        }

        if (create_acc_content_form_input_new.value.length < 6) {
            settings_create_acc_save_button.innerHTML = "Save"
            settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            create_acc_empty_field.innerHTML = "Password must be at least 6 characters"
            return 1
        }

        if (create_acc_content_form_input_new.value != create_acc_content_form_input_new_confirm.value) {
            create_acc_empty_field.innerHTML = "Passwords don't match"
            settings_create_acc_save_button.innerHTML = "Save"
            settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            return 1
        }

        var userIsGood = true

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var user = auth.currentUser;
                var credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    create_acc_content_form_input_old.value
                );
                user.reauthenticateWithCredential(credential).catch((error) => {
                    if (error.code = "auth/wrong-password") {
                        create_acc_empty_field.innerHTML = "Wrong Password"
                        settings_create_acc_save_button.innerHTML = "Save"
                        settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                        userIsGood = false
                    }

                    if (error.code = "auth/network-request-failed") {
                        create_acc_empty_field.innerHTML = "Network failed please try agin"
                        settings_create_acc_save_button.innerHTML = "Save"
                        settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                        userIsGood = false
                    }
                });
            }
        })

        if (userIsGood) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    var user = auth.currentUser;
                    var credential = firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        create_acc_content_form_input_old.value
                    );

                    user.updatePassword(create_acc_content_form_input_new.value).then(() => {
                        create_acc_empty_field.innerHTML = ""
                        swal("Success", "Password is updated", "success").then(() => {
                            window.location.href = "manage-acc.html"
                        })
                    }).catch((error) => {
                        if (error.code = "auth/requires-recent-login") {
                            user.reauthenticateWithCredential(credential)
                        }
                    })
                }
            });
        }


    }
    // S Adding onclick listener to the back button
    const name_settings_title_icon = document.getElementById("name-settings-title-icon")
    name_settings_title_icon.addEventListener("click", () => {
        localStorage['clickedValue'] = ""
        localStorage["verificationValue"] = ""
        window.location.href = "manage-acc.html"
    })
    // E Adding onclick listener to the back button

    settings_create_acc_save_button.addEventListener("click", onPressListener)
    settings_create_acc_cancel_button.addEventListener("click", () => {
        localStorage["clickedValue"] = ""
        window.location.href = "manage-acc.html"
    })
}

else if (value == "recoveryEmail") {
    const HTML = `        <div class="name-settings-title-container">
            <div class="name-settings-title"><i class="fa fa-arrow-left" id="name-settings-title-icon"></i>Email
            </div>
        </div>
        <div class="personal-info-container">
            <div class="personal-info">
                <div class="basic-info-container container">
                    <div class="head-intro">
                        <p class="head-additonal-info settings-head-additonal-info">The address used to identify your Ethioshare Account
                        </p>
                    </div>
                    <div class="basic-info">
                        <div class="basic-info-title settings-basic-info-title">Change Ethioshare Email</div>
                        <div class="create-acc-content password">
                            <input class="create-acc-content-form-input" type="text" placeholder="Email">
                        </div>
                        <div class="create-acc-content">
                            <p id="create-acc-empty-field"></p>
                        </div>
                        <div class="settings-create-acc-confirm-button-container">
                            <div class="settings-create-acc-confirm-button"> Cancel
                            </div>
                            <div class="settings-create-acc-confirm-button"> Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    main_profile_settings_container.innerHTML = HTML

    const create_acc_content_form_input_email = document.getElementsByClassName("create-acc-content-form-input")[0]
    const create_acc_empty_field = document.getElementById("create-acc-empty-field")
    const settings_create_acc_cancel_button = document.getElementsByClassName("settings-create-acc-confirm-button")[0]
    const settings_create_acc_save_button = document.getElementsByClassName("settings-create-acc-confirm-button")[1]

    function onPressListener() {
        settings_create_acc_save_button.style.backgroundColor = "rgb(55, 109, 247)"
        settings_create_acc_save_button.innerHTML = "Changing"

        if (create_acc_content_form_input_email.value == "") {
            create_acc_empty_field.innerHTML = "Email cannot be empty"
            settings_create_acc_save_button.innerHTML = "Save"
            settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            return 1
        }

        if (create_acc_content_form_input_email.value.includes("@") == false) {
            create_acc_empty_field.innerHTML = "Enter a valid email"
            settings_create_acc_save_button.innerHTML = "Save"
            settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            return 1
        }

        if (create_acc_content_form_input_email.value.includes(".") == false) {
            create_acc_empty_field.innerHTML = "Enter a valid email"
            settings_create_acc_save_button.innerHTML = "Save"
            settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            return 1
        }

        var userIsGood = true

        if (userIsGood) {
            firebase.auth().onAuthStateChanged(function (user) {
                user.updateEmail(create_acc_content_form_input_email.value).then(() => {
                    create_acc_empty_field.innerHTML = ""
                    swal("Success", "Email is updated", "success").then(() => {
                        window.location.href = "manage-acc.html"
                    })
                }).catch((error) => {
                    if (error.code = "auth/email-already-in-use") {
                        create_acc_empty_field.innerHTML = "Email already in use"
                        settings_create_acc_save_button.innerHTML = "Save"
                        settings_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                    }
                })
            });
        }


    }
    // S Adding onclick listener to the back button
    const name_settings_title_icon = document.getElementById("name-settings-title-icon")
    name_settings_title_icon.addEventListener("click", () => {
        localStorage['clickedValue'] = ""
        localStorage["verificationValue"] = ""
        window.location.href = "manage-acc.html"
    })
    // E Adding onclick listener to the back button

    settings_create_acc_save_button.addEventListener("click", onPressListener)
    settings_create_acc_cancel_button.addEventListener("click", () => {
        localStorage["clickedValue"] = ""
        window.location.href = "manage-acc.html"
    })

}

else if (value == "2fa") {
    const HTML = `        <div class="name-settings-title-container">
            <div class="name-settings-title"><i class="fa fa-arrow-left" id="name-settings-title-icon"></i>2-step Verification
            </div>
        </div>
        <div class="personal-info-container">
            <div class="personal-info">
                <div class="basic-info-container container">
                    <div class="head-intro">
                        <p class="head-additonal-info settings-head-additonal-info">Add 2-step verification to your account for each time you log-in <br/> you have to put in an OTP code that will be sent to your phone.
                        </p>
                    </div>
                    <div class="basic-info">
                        <div class="basic-info-title settings-basic-info-title">Write the OTP code sent to your phone</div>
                        <div class="create-acc-content password">
                            <input class="create-acc-content-form-input" type="text">
                        </div>
                        <div class="create-acc-content">
                            <p id="create-acc-empty-field"></p>
                        </div>
                        <div id="recaptchaVerifer"></div>
                        <div class="settings-create-acc-confirm-button-container">
                            <div class="settings-create-acc-confirm-button"> Cancel
                            </div>
                            <div class="settings-create-acc-confirm-button"> Next
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    main_profile_settings_container.innerHTML = HTML
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptchaVerifer');

    // S Adding onclick listener to the back button
    const name_settings_title_icon = document.getElementById("name-settings-title-icon")
    name_settings_title_icon.addEventListener("click", () => {
        localStorage['clickedValue'] = ""
        localStorage["verificationValue"] = ""
        window.location.href = "manage-acc.html"
    })
    // E Adding onclick listener to the back button
}


