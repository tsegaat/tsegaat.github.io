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

// Taking to the selected-buy/sell page start
const selectd_trade_btn = document.getElementsByClassName("selectd-trade-btn")[0]

selectd_trade_btn.addEventListener("click", () => {
    window.location.href = "buysell_selected.html"
})
// Taking to the selected-buy/sell page end

// Making the search bar value the main thing in the page start

const selectedCompanies = localStorage["company"].toLowerCase()

const searchCompanies = async searchText => {
    const res = await fetch("../2nd/companies.json")
    const companies = await res.json()

    let matches = companies.filter(company => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return company.name.match(regex)
    })

    const companyName = matches[0]["name"][0].toUpperCase() + matches[0]["name"].slice(1)
    const companySector = matches[0]["sector"][0].toUpperCase() + matches[0]["sector"].slice(1)
    const companyPrice = matches[0]["price"]
    const companyAltLogo = matches[0]["altLogo"]

    const rawCompanyName = matches[0]["name"]

    const table_selected_company_name = document.getElementsByClassName("table-company-name")[0]
    const selected_table_company_sector = document.getElementById("selected_table_company_sector")
    const selected_table_company_price = document.getElementById("selected_table_company_price")
    const selected_table_company_exchangescore = document.getElementById("selected_table_company_exchangescore")
    const selected_table_company_logo = document.getElementsByClassName("table-company-logo")[0]

    const ref = dbs.ref()
    ref.child("company_logos/" + rawCompanyName + ".png").getDownloadURL().then((url) => {
        selected_table_company_logo.setAttribute("style", `background-image: url(${url})`)
    }).catch(() => {
        selected_table_company_logo.innerHTML = companyAltLogo
        selected_table_company_logo.setAttribute("style", "transform: translateY(18px)")
    })

    table_selected_company_name.innerHTML = companyName
    selected_table_company_sector.innerHTML = companySector
    selected_table_company_price.innerHTML = companyPrice
}

searchCompanies(selectedCompanies)

// Making the search bar value the main thing in the page end

// Making the tab filter start
const all_comp_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[0]
const finance_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[1]
const resource_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[2]
const other_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[3]

all_comp_buy_sell_sector.addEventListener("click", () => {
    all_comp_buy_sell_sector.classList.add("buy-sell-sector-selected")
    finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    other_buy_sell_sector.classList.remove("buy-sell-sector-selected")
})

finance_buy_sell_sector.addEventListener("click", () => {
    finance_buy_sell_sector.classList.add("buy-sell-sector-selected")
    all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    other_buy_sell_sector.classList.remove("buy-sell-sector-selected")
})

resource_buy_sell_sector.addEventListener("click", () => {
    resource_buy_sell_sector.classList.add("buy-sell-sector-selected")
    finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    other_buy_sell_sector.classList.remove("buy-sell-sector-selected")
})

other_buy_sell_sector.addEventListener("click", () => {
    other_buy_sell_sector.classList.add("buy-sell-sector-selected")
    finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
})
// Making the tab filter end

// Getting all the information from the db and JSON and put it somewhere start 

// Getting all the information from the db and JSON and put it somewhere end