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

// Start of home bottom
const home_btn = document.getElementsByClassName("home-btn")[0]
home_btn.addEventListener("click", () => {
    window.location.href = "main-page.html"
})
// End of home button

// Verify me start
const profile_settings_li_normal_verify = document.getElementsByClassName("profile-settings-li-normal")[0]
profile_settings_li_normal_verify.addEventListener("click", () => {
    window.location.href = "verify_me.html"
})
// Verify me end

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
    })
})
// End of signout option



// making the site dependant on the privous site
const value = localStorage["clickedValue"]

if (value == "Name") {
    // filling name

    const profile_container_div = document.querySelector("#main-profile-settings-container")

    const HTML = `    <div class="personal-info-container">
        <div class="personal-info">
            <div class="basic-info-container container">
                <div class="head-intro">
                    <p class="head-additonal-info settings-head-additonal-info">Changes to your name will be reflected
                        on your Ethioshare Account.
                    </p>
                </div>
                <div class="basic-info">
                    <div class="basic-info-title settings-basic-info-title">Change name</div>
                    <div class="create-acc-content">
                        <input class="create-acc-content-form-input" type="text" placeholder="First Name">
                    </div>
                    <div class="create-acc-content password">
                        <input class="create-acc-content-form-input" type="text" placeholder="Last Name">
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

    profile_container_div.innerHTML += HTML

    const name_settings_title = document.getElementsByClassName("name-settings-title")[0]
    name_settings_title.innerHTML += localStorage["clickedValue"]
    const create_acc_content_form_input_firstName = document.getElementsByClassName("create-acc-content-form-input")[0]
    const create_acc_content_form_input_lastName = document.getElementsByClassName("create-acc-content-form-input")[1]
    const create_acc_empty_field = document.getElementById("create-acc-empty-field")
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // console.log(firebase.auth().currentUser)
            dbf.collection("users").doc(user.uid).get().then((doc) => {
                const firstName = doc.data().firstName
                const lastName = doc.data().lastName
                create_acc_content_form_input_firstName.value = firstName
                create_acc_content_form_input_lastName.value = lastName
            })
        }
    });
    // filling name
    const setting_create_acc_save_button = document.getElementsByClassName("settings-create-acc-confirm-button")[1]
    setting_create_acc_save_button.addEventListener("click", () => {
        setting_create_acc_save_button.innerHTML = "Changing..."
        setting_create_acc_save_button.style.backgroundColor = "rgb(55, 109, 247)"
        const entered_first_name = create_acc_content_form_input_firstName.value
        const entered_last_name = create_acc_content_form_input_lastName.value

        var correctNameBool = true

        if (entered_first_name == "" || entered_last_name == "") {
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            create_acc_empty_field.innerHTML = "Cannot be empty"
        }

        if (!(/^[a-zA-Z]+$/.test(entered_first_name))) {
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            create_acc_empty_field.innerHTML = "Name can only contain letters"
            correctNameBool = false
        }

        if (!(/^[a-zA-Z]+$/.test(entered_last_name))) {
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            create_acc_empty_field.innerHTML = "Name can only contain letters"
            correctNameBool = false
        }

        var fixed_firstName = entered_first_name.toLowerCase()
        var fixed_lastName = entered_last_name.toLowerCase()

        fixed_firstName = fixed_firstName.charAt(0).toUpperCase() + fixed_firstName.slice(1);
        fixed_lastName = fixed_lastName.charAt(0).toUpperCase() + fixed_lastName.slice(1);

        if (correctNameBool) {
            firebase.firestore().collection('users').doc(auth.currentUser.uid).update({
                firstName: fixed_firstName,
                lastName: fixed_lastName
            }).then(() => {
                setting_create_acc_save_button.innerHTML = "Save"
                setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                swal("Success", "Name is updated", "success").then(() => {
                    window.location.href = "manage-acc.html"
                })
            })
                // TODO: Fix this internet off error handleing
                .catch((error) => {
                    setting_create_acc_save_button.innerHTML = "Save"
                    setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                    create_acc_empty_field.innerHTML = "Network failed please try agin"
                    console.log("tsega  ", error)
                })

        }
    })

    // E Adding onclick listener to the back button
    const setting_create_acc_cancel_button = document.getElementsByClassName("settings-create-acc-confirm-button")[0]
    setting_create_acc_cancel_button.addEventListener("click", () => {
        localStorage["clickedValue"] = ""
        window.location.href = "manage-acc.html"
    })
}
else if (value == "Birthday") {
    const profile_container_div = document.querySelector("#main-profile-settings-container")

    const HTML = `<div class="personal-info">
            <div class="basic-info-container container basic-info-container-container-birthday">
                <div class="head-intro">
                    <p class="head-additonal-info settings-head-additonal-info">Your birthday may be used for account
                        security and personalization for your Ethioshare Account.
                    </p>
                </div>
                <div class="basic-info">
                    <div class="basic-info-title settings-basic-info-title">Set Birthday</div>
                    <div>
                        <input class="create-acc-content-form-input create-acc-content-form-input-date" type="date">
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
        </div>`

    profile_container_div.innerHTML += HTML
    const name_settings_title = document.getElementsByClassName("name-settings-title")[0]
    name_settings_title.innerHTML += localStorage["clickedValue"]

    const setting_create_acc_save_button = document.getElementsByClassName("settings-create-acc-confirm-button")[1]
    const create_acc_empty_field = document.getElementById("create-acc-empty-field")
    setting_create_acc_save_button.addEventListener("click", () => {
        const create_acc_content_form_date = document.getElementsByClassName("create-acc-content-form-input-date")[0]
        setting_create_acc_save_button.innerHTML = "Changing..."
        setting_create_acc_save_button.style.backgroundColor = "rgb(55, 109, 247)"

        const birthday = create_acc_content_form_date.value
        const birthYear = create_acc_content_form_date.value.split("-")[0]
        const dateObj = new Date
        const currentYear = dateObj.getFullYear()

        var checkBirthday = true;
        if (birthYear > currentYear) {
            create_acc_empty_field.innerHTML = "Invalid year"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            checkBirthday = false
        }

        if (birthYear > currentYear - 18) {
            create_acc_empty_field.innerHTML = "You have to be 18 or above"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            checkBirthday = false
        }

        if (birthYear < currentYear - 150) {
            create_acc_empty_field.innerHTML = "Invalid year"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            checkBirthday = false
        }

        if (checkBirthday) {
            firebase.firestore().collection('users').doc(auth.currentUser.uid).update({
                birthday: birthday,
            }).then(() => {
                setting_create_acc_save_button.innerHTML = "Save"
                setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                swal("Success", "Birthday is updated", "success").then(() => {
                    window.location.href = "manage-acc.html"
                })
            })
                // TODO: Fix this internet off error handleing
                .catch((error) => {
                    setting_create_acc_save_button.innerHTML = "Save"
                    setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                    create_acc_empty_field.innerHTML = "Network failed please try agin"
                    console.log("tsega  ", error)
                })
        }

    })
    // E Adding onclick listener to the back button
    const setting_create_acc_cancel_button = document.getElementsByClassName("settings-create-acc-confirm-button")[0]
    setting_create_acc_cancel_button.addEventListener("click", () => {
        localStorage["clickedValue"] = ""
        window.location.href = "manage-acc.html"
    })
}
else if (value == "Gender") {
    const profile_container_div = document.querySelector("#main-profile-settings-container")

    const HTML = `        <div class="personal-info">
            <div class="basic-info-container container basic-info-container-container-birthday">
                <div class="head-intro">
                    <p class="head-additonal-info settings-head-additonal-info">Indicating your gender lets Ethioshare
                        know how to refer to you.
                    </p>
                </div>
                <div class="basic-info">
                    <div class="basic-info-title settings-basic-info-title">Gender</div>
                    <div>
                        <div class="gender-indicator-container">
                            <input class="gender-indicator-checkbox" type="checkbox">
                            <div class="gender-indicator-text gender-indicator-text-male">Male</div>
                        </div>
                        <div style="margin-top: 16px;" class="gender-indicator-container">
                            <input class="gender-indicator-checkbox" type="checkbox">
                            <div class="gender-indicator-text gender-indicator-text-female">Female</div>
                        </div>
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
        </div>`

    profile_container_div.innerHTML += HTML
    const name_settings_title = document.getElementsByClassName("name-settings-title")[0]
    name_settings_title.innerHTML += localStorage["clickedValue"]

    const gender_indicator_text_male = document.getElementsByClassName("gender-indicator-checkbox")[0]
    const gender_indicator_text_female = document.getElementsByClassName("gender-indicator-checkbox")[1]

    gender_indicator_text_male.addEventListener("click", () => {
        gender_indicator_text_female.checked = false;
    })

    gender_indicator_text_female.addEventListener("click", () => {
        gender_indicator_text_male.checked = false;
    })

    const create_acc_empty_field = document.getElementById("create-acc-empty-field")
    const setting_create_acc_save_button = document.getElementsByClassName("settings-create-acc-confirm-button")[1]
    setting_create_acc_save_button.addEventListener("click", () => {
        const create_acc_content_form_input_date = document.getElementsByClassName("create-acc-content-form-input-date")[0]
        setting_create_acc_save_button.innerHTML = "Changing..."
        setting_create_acc_save_button.style.backgroundColor = "rgb(55, 109, 247)"

        var oneCheckedBool = true;

        var userGender = ""
        if (gender_indicator_text_female.checked) {
            userGender = "female"
        } else if (gender_indicator_text_male.checked) {
            userGender = "male"
        } else {
            create_acc_empty_field.innerHTML = "Check one of the fields"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            oneCheckedBool = false
        }

        if (oneCheckedBool) {
            firebase.firestore().collection('users').doc(auth.currentUser.uid).update({
                gender: userGender,
            }).then(() => {
                setting_create_acc_save_button.innerHTML = "Save"
                setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                swal("Success", "Gender is updated", "success").then(() => {
                    window.location.href = "manage-acc.html"
                })
            })
                // TODO: Fix this internet off error handleing
                .catch((error) => {
                    setting_create_acc_save_button.innerHTML = "Save"
                    setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                    create_acc_empty_field.innerHTML = "Network failed please try agin"
                    console.log("tsega  ", error)
                })
        }


    })
    // E Adding onclick listener to the back button
    const setting_create_acc_cancel_button = document.getElementsByClassName("settings-create-acc-confirm-button")[0]
    setting_create_acc_cancel_button.addEventListener("click", () => {
        localStorage["clickedValue"] = ""
        window.location.href = "manage-acc.html"
    })
}
else if (value == "Email") {
    const profile_container_div = document.querySelector("#main-profile-settings-container")

    const HTML = `        <div class="personal-info-container">
            <div class="personal-info">
                <div class="basic-info-container container">
                    <div class="head-intro">
                    </div>
                    <div class="basic-info">
                        <div class="basic-info-title settings-basic-info-title">Ethioshare Email</div>
                        <div class="basic-info-title settings-basic-info-subtitle">The address used to identify your Ethioshare Account</div>
                        <div class="create-acc-content create-acc-content-recoveryemail">
                            <div class="create-acc-content-form-user-email"></div>
                            <div class="basic-info-type-change"><i class="fa fa-arrow-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    profile_container_div.innerHTML += HTML
    const name_settings_title = document.getElementsByClassName("name-settings-title")[0]
    name_settings_title.innerHTML += localStorage["clickedValue"]
    auth.onAuthStateChanged(function (user) {
        if (user) {
            const create_acc_content_form_useremail = document.getElementsByClassName("create-acc-content-form-user-email")[0]
            create_acc_content_form_useremail.innerHTML = auth.currentUser.email
        }
    });

    const create_acc_content_recoveryemail = document.getElementsByClassName("create-acc-content-recoveryemail")[0]
    create_acc_content_recoveryemail.addEventListener("click", () => {
        localStorage['verificationValue'] = "recoveryEmail"
        window.location.href = "verification_page.html"
    })
}
else if (value == "Phone") {
    const profile_container_div = document.querySelector("#main-profile-settings-container")

    const HTML = `        <div class="personal-info-container">
            <div class="personal-info">
                <div class="basic-info-container container">
                    <div class="head-intro">
                        <p class="head-additonal-info settings-head-additonal-info">Your number can be used to deliver important notifications<br/> ,help you sign in, and more
                        </p>
                    </div>
                    <div class="basic-info">
                        <div class="basic-info-title settings-basic-info-title">Change Phone Number</div>
                        <div class="create-acc-content">
                            <input class="create-acc-content-form-input" type="tel" placeholder="Format: 0912345678">
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

    profile_container_div.innerHTML += HTML
    const name_settings_title = document.getElementsByClassName("name-settings-title")[0]
    name_settings_title.innerHTML += localStorage["clickedValue"]

    const create_acc_empty_field = document.getElementById("create-acc-empty-field")
    const create_acc_content_form_input = document.getElementsByClassName("create-acc-content-form-input")[0]
    const setting_create_acc_save_button = document.getElementsByClassName("settings-create-acc-confirm-button")[1]
    setting_create_acc_save_button.addEventListener("click", () => {
        setting_create_acc_save_button.innerHTML = "Changing..."
        setting_create_acc_save_button.style.backgroundColor = "rgb(55, 109, 247)"

        var phoneCheck;
        if (!isNaN(create_acc_content_form_input.value)) {
            phoneCheck = true;
        } else if (isNaN(create_acc_content_form_input.value)) {
            phoneCheck = false;
            create_acc_empty_field.innerHTML = "Invalid phone number"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
        }

        if (create_acc_content_form_input.value.length != 10) {
            phoneCheck = false;
            create_acc_empty_field.innerHTML = "Invalid phone number"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
        }

        // console.log(create_acc_content_form_input.value[0].toString() != "0")

        if (create_acc_content_form_input.value[0].toString() != "0") {
            create_acc_empty_field.innerHTML = "Invalid phone number"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            phoneCheck = false;
        }

        if (create_acc_content_form_input.value[1].toString() != "9" && create_acc_content_form_input.value[1].toString() != "1") {
            create_acc_empty_field.innerHTML = "Invalid phone number"
            setting_create_acc_save_button.innerHTML = "Save"
            setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
            phoneCheck = false;
        }

        const phoneNumber = create_acc_content_form_input.value

        if (phoneCheck) {
            firebase.firestore().collection('users').doc(auth.currentUser.uid).update({
                phone: phoneNumber,
            }).then(() => {
                setting_create_acc_save_button.innerHTML = "Save"
                setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                swal("Success", "Phone number is updated", "success").then(() => {
                    window.location.href = "manage-acc.html"
                })

            })
                // TODO: Fix this internet off error handleing
                .catch((error) => {
                    setting_create_acc_save_button.innerHTML = "Save"
                    setting_create_acc_save_button.style.backgroundColor = "rgb(22, 82, 240)"
                    create_acc_empty_field.innerHTML = "Network failed please try agin"
                    console.log(error)
                })
        }


    })

    // E Adding onclick listener to the back button
    const setting_create_acc_cancel_button = document.getElementsByClassName("settings-create-acc-confirm-button")[0]
    setting_create_acc_cancel_button.addEventListener("click", () => {
        localStorage["clickedValue"] = ""
        window.location.href = "manage-acc.html"
    })
}

// making the site dependant on the privous site


// S Adding onclick listener to the back button
const name_settings_title_icon = document.getElementById("name-settings-title-icon")
name_settings_title_icon.addEventListener("click", () => {
    localStorage['clickedValue'] = ""
    window.location.href = "manage-acc.html"
})
