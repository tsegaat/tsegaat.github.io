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

                const verify_me_tab = document.getElementsByClassName("profile-settings-li profile-settings-li-normal")[0]
                verify_me_tab.remove()
            }
        })
    }
});

const all_companies = more_options_container.children[0]
all_companies.addEventListener("click", () => {
    window.location.href = "../3rth/all_companies.html"
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

profile_settings_profilepicture_input.addEventListener("change", handleProfilePicture)

function handleProfilePicture() {
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
    window.location.href = "../2nd/main-page.html"
})
// End of home button

// Verify me start
const profile_settings_li_normal_verify = document.getElementsByClassName("profile-settings-li-normal")[0]
profile_settings_li_normal_verify.addEventListener("click", () => {
    window.location.href = "../2nd/verify_me.html"
})
// Verify me end

// Start of going to manage account page
const profile_settings_manage = document.getElementsByClassName("profile-settings-manage")[0]
profile_settings_manage.addEventListener("click", () => {
    window.location.href = "../2nd/manage-acc.html"
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



// Getting the selected company and putting out there start

const selectedCompany = localStorage['selectedCompany'].split(",");

const companyName = selectedCompany[0]
const companyPrice = selectedCompany[1]

const domCompName = document.getElementById("changeName")
const domCompPrice = document.getElementById("actualPrice")
const domCompTotal = document.getElementById("total-price-text")

const companyTotalPrice = companyPrice.split(" ")[0]

domCompTotal.innerHTML = companyTotalPrice
domCompName.innerHTML = companyName
domCompPrice.innerHTML = companyTotalPrice
const domCompImg = document.getElementById("changeImg")
dbs.ref().child("company_logos/" + companyName.toLowerCase() + ".png").getDownloadURL().then((url) => {
    domCompImg.setAttribute("style", `background-image: url(${url})`)
})

// Getting the selected company and putting out there end

// Making the shares interactive with the total price start

const quantity = document.getElementById("quantity")
const premium_input = document.getElementById("premium-input")

premium_input.addEventListener("input", () => {
    var premiumAmount = Number(premium_input.value)
    var compPrice = Number(companyTotalPrice)
    var premiumCompPrice = premiumAmount + compPrice

    domCompTotal.innerHTML = premiumCompPrice
})

quantity.addEventListener("input", () => {
    var quantityAmount = Number(quantity.value)
    var premiumAmount = Number(premium_input.value)
    var compPrice = Number(companyTotalPrice)

    var premiumCompPrice = premiumAmount + compPrice

    domCompTotal.innerHTML = premiumCompPrice * quantityAmount
})

// Making the shares interactive with the total price end


// The submit button start
// If the share is negative and 0 throw an error start
const submitOfferBtn = document.getElementById("submitBtn")
// TODO: Make the quantity input bar not accept negative or 0
submitOfferBtn.addEventListener("click", () => {
    submitOfferBtn.innerHTML = "Submiting..."
    submitOfferBtn.style.backgroundColor = "#dbdbdb"
    if (quantity.value < "1") {
        swal("Invalid Shares", "Shares can't be negative or 0", "error")
    } else {
        var aboutRequestInfo = {}
        const userId = auth.currentUser.uid
        dbf.collection("users").doc(userId).get().then((doc) => {
            aboutRequestInfo['username'] = doc.username
        })
        aboutRequestInfo['companyName'] = companyName.toLowerCase()
        aboutRequestInfo['userPremium'] = Number(premium_input.value)
        aboutRequestInfo['shareQuantity'] = Number(quantity.value)
        const date = new Date()
        const fullDate = date.getDate() + "/" + Number(date.getMonth() + 1) + "/" + date.getFullYear()
        aboutRequestInfo['requestedDate'] = fullDate


        async function getSectorFromJSON() {
            const res = await fetch("../2nd/companies.json")
            const companies = await res.json()
            const uid = auth.currentUser.uid
            dbf.collection("users").doc(uid).get().then((doc) => {
                const username = doc.data().username
                aboutRequestInfo['username'] = username
                let matches = companies.filter(company => {
                    const regex = new RegExp(`^${companyName.toLowerCase()}`, 'gi')
                    return company.name.match(regex)
                })

                aboutRequestInfo['companyPrice'] = matches[0]['price']
                aboutRequestInfo['companySector'] = matches[0]['sector']
                dbf.collection("buyers_requests").doc().set(aboutRequestInfo).then(() => {
                    submitOfferBtn.innerHTML = "Submit Offer"
                    submitOfferBtn.style.backgroundColor = "#e7ebf5"
                    swal("Your offer has been submitted", "Interested person will contact if your request is accepted", "success").then(() => {
                        window.location.href = "../2nd/main-page.html"
                    })
                })
            })

        }
        getSectorFromJSON()


    }
})

// The submit button end

