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

// Getting the tbody to put the values in start
const table_row_container = document.getElementById("table-row-container")

async function getRequests() {
    const HTML = `<tr>
            <td class="table_company_number"></td>
            <td class="table_username"></td>
            <td><span>
                    <div class="table-company-logo"></div>
                </span></td>
            <td>
                <span class="table-company-name"></span>
            </td>
            <td class="table_company_sector"></td>
            <td class="table_company_price"></td>
            <td class="table_company_quantity"></td>
            <td class="table_company_date"></td>
            <td class="table_company_userpremium"></td>
            <td><button class="table-trade-btn btn">Exchange</button></td>
        </tr>`

    const table_company_number = document.getElementsByClassName("table_company_number")
    const table_username = document.getElementsByClassName("table_username")
    const table_company_logo = document.getElementsByClassName("table-company-logo")
    const table_company_name = document.getElementsByClassName("table-company-name")
    const table_company_sector = document.getElementsByClassName("table_company_sector")
    const table_company_quantity = document.getElementsByClassName("table_company_quantity")
    const table_company_price = document.getElementsByClassName("table_company_price")
    const table_company_date = document.getElementsByClassName("table_company_date")
    const table_company_userpremium = document.getElementsByClassName("table_company_userpremium")

    dbf.collection('buyers_requests').get().then((snapshot) => {
        const allBuyerRequests = snapshot.docs.map(doc => doc.data())
        // console.log(allBuyerRequests)
        for (var i = 0; i < allBuyerRequests.length; i++) {
            table_row_container.innerHTML += HTML
        }

        async function getJson() {
            const res = await fetch("../2nd/companies.json")
            const companies = await res.json()

            let matches = companies.filter(company => {
                return company
            })

            for (var i = 0; i < allBuyerRequests.length; i++) {
                var fullUsername = allBuyerRequests[i]['username']
                const strlen = fullUsername.length - 3
                var cutUsername = fullUsername.substring(0, strlen) + "***"
                table_username[i].innerHTML = cutUsername
                table_company_name[i].innerHTML = allBuyerRequests[i]['companyName'][0].toUpperCase() + allBuyerRequests[i]['companyName'].slice(1)
                table_company_sector[i].innerHTML = allBuyerRequests[i]["companySector"][0].toUpperCase() + allBuyerRequests[i]["companySector"].slice(1)
                table_company_price[i].innerHTML = allBuyerRequests[i]["companyPrice"]
                table_company_quantity[i].innerHTML = allBuyerRequests[i]['shareQuantity']
                table_company_date[i].innerHTML = allBuyerRequests[i]['requestedDate']
                table_company_userpremium[i].innerHTML = allBuyerRequests[i]['userPremium'] + " " + "ETB"
                table_company_number[i].innerHTML = i + 1

                // TODO: Logo not working
                const ref = dbs.ref()
                ref.child("company_logos/" + allBuyerRequests[i]['companyName'] + ".png").getDownloadURL().then((url) => {
                    table_company_logo[i].setAttribute("style", `background-image: url(${url})`)
                })
            }
        }
        getJson()
    })



}
getRequests()
// Getting the tbody to put the values in end

// Configuring the filters start
const all_comp_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[0]
const finance_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[1]
const resource_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[2]
const other_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[3]
const buy_sell_input_field = document.getElementsByClassName("buy-sell-input-field")[0]

async function returnCompnaySectors() {
    const table_row_container = document.getElementById("table-row-container")
    all_comp_buy_sell_sector.addEventListener("click", () => {
        buy_sell_input_field.value = ""
        table_row_container.innerHTML = ''
        all_comp_buy_sell_sector.classList.add("buy-sell-sector-selected")
        finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const HTML = `<tr>
        <td class="table_company_number"></td>
        <td class="table_username"></td>
        <td><span>
                <div class="table-company-logo"></div>
            </span></td>
        <td>
            <span class="table-company-name"></span>
        </td>
        <td class="table_company_sector"></td>
        <td class="table_company_price"></td>
        <td class="table_company_quantity"></td>
        <td class="table_company_date"></td>
        <td class="table_company_userpremium"></td>
        <td><button class="table-trade-btn btn">Exchange</button></td>
    </tr>`

        const table_company_number = document.getElementsByClassName("table_company_number")
        const table_username = document.getElementsByClassName("table_username")
        const table_company_logo = document.getElementsByClassName("table-company-logo")
        const table_company_name = document.getElementsByClassName("table-company-name")
        const table_company_sector = document.getElementsByClassName("table_company_sector")
        const table_company_quantity = document.getElementsByClassName("table_company_quantity")
        const table_company_price = document.getElementsByClassName("table_company_price")
        const table_company_date = document.getElementsByClassName("table_company_date")
        const table_company_userpremium = document.getElementsByClassName("table_company_userpremium")

        dbf.collection('buyers_requests').get().then((snapshot) => {
            const allBuyerRequestsNofilter = []
            const allBuyerRequests = snapshot.docs.map(doc => doc.data())

            for (var i = 0; i < allBuyerRequests.length; i++) {
                table_row_container.innerHTML += HTML
                allBuyerRequestsNofilter.push(allBuyerRequests[i])
            }
            const all_companies = []
            async function getJson() {
                const res = await fetch("../2nd/companies.json")
                const companies = await res.json()

                let matches = companies.filter(company => {
                    return company
                })

                for (var i = 0; i < allBuyerRequestsNofilter.length; i++) {
                    var fullUsername = allBuyerRequestsNofilter[i]['username']
                    const strlen = fullUsername.length - 3
                    var cutUsername = fullUsername.substring(0, strlen) + "***"
                    table_username[i].innerHTML = cutUsername
                    table_company_name[i].innerHTML = allBuyerRequestsNofilter[i]['companyName'][0].toUpperCase() + allBuyerRequestsNofilter[i]['companyName'].slice(1)
                    table_company_sector[i].innerHTML = allBuyerRequestsNofilter[i]["companySector"][0].toUpperCase() + allBuyerRequestsNofilter[i]["companySector"].slice(1)
                    table_company_price[i].innerHTML = allBuyerRequestsNofilter[i]["companyPrice"]
                    table_company_quantity[i].innerHTML = allBuyerRequestsNofilter[i]['shareQuantity']
                    table_company_date[i].innerHTML = allBuyerRequestsNofilter[i]['requestedDate']
                    table_company_userpremium[i].innerHTML = allBuyerRequestsNofilter[i]['userPremium'] + " " + "ETB"
                    table_company_number[i].innerHTML = i + 1

                    // TODO: Logo not working
                    // const ref = dbs.ref()
                    // ref.child("company_logos/" + allBuyerRequestsNofilter[i]['companyName'] + ".png").getDownloadURL().then((url) => {
                    //     table_company_logo[i].setAttribute("style", `background-image: url(${url})`)
                    // })
                }
            }
            getJson()
        })


    })

    finance_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        buy_sell_input_field.value = ""
        finance_buy_sell_sector.classList.add("buy-sell-sector-selected")
        all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        other_buy_sell_sector.classList.remove("buy-sell-sector-selected")


        const table_company_number = document.getElementsByClassName("table_company_number")
        const table_username = document.getElementsByClassName("table_username")
        const table_company_logo = document.getElementsByClassName("table-company-logo")
        const table_company_name = document.getElementsByClassName("table-company-name")
        const table_company_sector = document.getElementsByClassName("table_company_sector")
        const table_company_quantity = document.getElementsByClassName("table_company_quantity")
        const table_company_price = document.getElementsByClassName("table_company_price")
        const table_company_date = document.getElementsByClassName("table_company_date")
        const table_company_userpremium = document.getElementsByClassName("table_company_userpremium")

        dbf.collection('buyers_requests').get().then((snapshot) => {
            const allBuyerRequestsFinance = []
            const allBuyerRequests = snapshot.docs.map(doc => doc.data())

            for (var i = 0; i < allBuyerRequests.length; i++) {
                if (allBuyerRequests[i]["companySector"] == "finance") {
                    allBuyerRequestsFinance.push(allBuyerRequests[i])
                    const HTML = `<tr>
                    <td class="table_company_number"></td>
                    <td class="table_username"></td>
                    <td><span>
                            <div class="table-company-logo"></div>
                        </span></td>
                    <td>
                        <span class="table-company-name"></span>
                    </td>
                    <td class="table_company_sector"></td>
                    <td class="table_company_price"></td>
                    <td class="table_company_quantity"></td>
                    <td class="table_company_date"></td>
                    <td class="table_company_userpremium"></td>
                    <td><button class="table-trade-btn btn">Exchange</button></td>
                </tr>`
                    table_row_container.innerHTML += HTML
                }

            }
            async function getJson() {
                const res = await fetch("../2nd/companies.json")
                const companies = await res.json()

                let matches = companies.filter(company => {
                    return company
                })

                for (var i = 0; i < allBuyerRequestsFinance.length; i++) {
                    var fullUsername = allBuyerRequestsFinance[i]['username']
                    const strlen = fullUsername.length - 3
                    var cutUsername = fullUsername.substring(0, strlen) + "***"
                    table_username[i].innerHTML = cutUsername
                    table_company_name[i].innerHTML = allBuyerRequestsFinance[i]['companyName'][0].toUpperCase() + allBuyerRequestsFinance[i]['companyName'].slice(1)
                    table_company_sector[i].innerHTML = allBuyerRequestsFinance[i]["companySector"][0].toUpperCase() + allBuyerRequestsFinance[i]["companySector"].slice(1)
                    table_company_price[i].innerHTML = allBuyerRequestsFinance[i]["companyPrice"]
                    table_company_date[i].innerHTML = allBuyerRequestsFinance[i]['requestedDate']
                    table_company_quantity[i].innerHTML = allBuyerRequestsFinance[i]['shareQuantity']
                    table_company_userpremium[i].innerHTML = allBuyerRequestsFinance[i]['userPremium'] + " " + "ETB"
                    table_company_number[i].innerHTML = i + 1

                    // TODO: Logo not working
                    // const ref = dbs.ref()
                    // ref.child("company_logos/" + allBuyerRequestsNofilter[i]['companyName'] + ".png").getDownloadURL().then((url) => {
                    //     table_company_logo[i].setAttribute("style", `background-image: url(${url})`)
                    // })
                }
            }
            getJson()
        })
    })

    resource_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        buy_sell_input_field.value = ""
        resource_buy_sell_sector.classList.add("buy-sell-sector-selected")
        all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const table_company_number = document.getElementsByClassName("table_company_number")
        const table_username = document.getElementsByClassName("table_username")
        const table_company_logo = document.getElementsByClassName("table-company-logo")
        const table_company_name = document.getElementsByClassName("table-company-name")
        const table_company_sector = document.getElementsByClassName("table_company_sector")
        const table_company_quantity = document.getElementsByClassName("table_company_quantity")
        const table_company_price = document.getElementsByClassName("table_company_price")
        const table_company_date = document.getElementsByClassName("table_company_date")
        const table_company_userpremium = document.getElementsByClassName("table_company_userpremium")

        dbf.collection('buyers_requests').get().then((snapshot) => {
            const allBuyerRequestsResource = []
            const allBuyerRequests = snapshot.docs.map(doc => doc.data())

            for (var i = 0; i < allBuyerRequests.length; i++) {
                if (allBuyerRequests[i]["companySector"] == "resource") {
                    allBuyerRequestsResource.push(allBuyerRequests[i])
                    const HTML = `<tr>
                    <td class="table_company_number"></td>
                    <td class="table_username"></td>
                    <td><span>
                            <div class="table-company-logo"></div>
                        </span></td>
                    <td>
                        <span class="table-company-name"></span>
                    </td>
                    <td class="table_company_sector"></td>
                    <td class="table_company_price"></td>
                    <td class="table_company_quantity"></td>
                    <td class="table_company_date"></td>
                    <td class="table_company_userpremium"></td>
                    <td><button class="table-trade-btn btn">Exchange</button></td>
                </tr>`
                    table_row_container.innerHTML += HTML
                }

            }
            async function getJson() {
                const res = await fetch("../2nd/companies.json")
                const companies = await res.json()

                let matches = companies.filter(company => {
                    return company
                })

                for (var i = 0; i < allBuyerRequestsResource.length; i++) {
                    var fullUsername = allBuyerRequestsResource[i]['username']
                    const strlen = fullUsername.length - 3
                    var cutUsername = fullUsername.substring(0, strlen) + "***"
                    table_username[i].innerHTML = cutUsername
                    table_company_name[i].innerHTML = allBuyerRequestsResource[i]['companyName'][0].toUpperCase() + allBuyerRequestsResource[i]['companyName'].slice(1)
                    table_company_sector[i].innerHTML = allBuyerRequestsResource[i]["companySector"][0].toUpperCase() + allBuyerRequestsResource[i]["companySector"].slice(1)
                    table_company_price[i].innerHTML = allBuyerRequestsResource[i]["companyPrice"]
                    table_company_quantity[i].innerHTML = allBuyerRequestsResource[i]['shareQuantity']
                    table_company_date[i].innerHTML = allBuyerRequestsResource[i]['requestedDate']
                    table_company_userpremium[i].innerHTML = allBuyerRequestsResource[i]['userPremium'] + " " + "ETB"
                    table_company_number[i].innerHTML = i + 1

                    // TODO: Logo not working
                    // const ref = dbs.ref()
                    // ref.child("company_logos/" + allBuyerRequestsNofilter[i]['companyName'] + ".png").getDownloadURL().then((url) => {
                    //     table_company_logo[i].setAttribute("style", `background-image: url(${url})`)
                    // })
                }
            }
            getJson()
        })

    })

    other_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        buy_sell_input_field.value = ""
        other_buy_sell_sector.classList.add("buy-sell-sector-selected")
        all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const table_company_number = document.getElementsByClassName("table_company_number")
        const table_username = document.getElementsByClassName("table_username")
        const table_company_logo = document.getElementsByClassName("table-company-logo")
        const table_company_name = document.getElementsByClassName("table-company-name")
        const table_company_sector = document.getElementsByClassName("table_company_sector")
        const table_company_quantity = document.getElementsByClassName("table_company_quantity")
        const table_company_date = document.getElementsByClassName("table_company_date")
        const table_company_price = document.getElementsByClassName("table_company_price")
        const table_company_userpremium = document.getElementsByClassName("table_company_userpremium")

        dbf.collection('buyers_requests').get().then((snapshot) => {
            const allBuyerRequestsOther = []
            const allBuyerRequests = snapshot.docs.map(doc => doc.data())
            for (var i = 0; i < allBuyerRequests.length; i++) {

                if (allBuyerRequests[i]["companySector"] == "other") {
                    const HTML = `<tr>
                            <td class="table_company_number"></td>
                            <td class="table_username"></td>
                            <td><span>
                                    <div class="table-company-logo"></div>
                                </span></td>
                            <td>
                                <span class="table-company-name"></span>
                            </td>
                            <td class="table_company_sector"></td>
                            <td class="table_company_price"></td>
                            <td class="table_company_quantity"></td>
                            <td class="table_company_date"></td>
                            <td class="table_company_userpremium"></td>
                            <td><button class="table-trade-btn btn">Exchange</button></td>
                        </tr>`
                    table_row_container.innerHTML += HTML
                    allBuyerRequestsOther.push(allBuyerRequests[i])
                }

            }
            async function getJson() {
                const res = await fetch("../2nd/companies.json")
                const companies = await res.json()

                let matches = companies.filter(company => {
                    return company
                })

                for (var i = 0; i < allBuyerRequestsOther.length; i++) {
                    var fullUsername = allBuyerRequestsOther[i]['username']
                    const strlen = fullUsername.length - 3
                    var cutUsername = fullUsername.substring(0, strlen) + "***"
                    table_username[i].innerHTML = cutUsername
                    table_company_name[i].innerHTML = allBuyerRequestsOther[i]['companyName'][0].toUpperCase() + allBuyerRequestsOther[i]['companyName'].slice(1)
                    table_company_sector[i].innerHTML = allBuyerRequestsOther[i]["companySector"][0].toUpperCase() + allBuyerRequestsOther[i]["companySector"].slice(1)
                    table_company_price[i].innerHTML = allBuyerRequestsOther[i]["companyPrice"]
                    table_company_quantity[i].innerHTML = allBuyerRequests[i]['shareQuantity']
                    table_company_date[i].innerHTML = allBuyerRequests[i]['requestedDate']
                    table_company_userpremium[i].innerHTML = allBuyerRequestsOther[i]['userPremium'] + " " + "ETB"
                    table_company_number[i].innerHTML = i + 1

                    // TODO: Logo not working
                    // const ref = dbs.ref()
                    // ref.child("company_logos/" + allBuyerRequestsNofilter[i]['companyName'] + ".png").getDownloadURL().then((url) => {
                    //     table_company_logo[i].setAttribute("style", `background-image: url(${url})`)
                    // })
                }
            }
            getJson()
        })

    })
}
returnCompnaySectors()

// Configuring the filters end

// Search bar start
const buysellSearchCompanies = async searchText => {
    table_row_container.innerHTML = ""

    all_comp_buy_sell_sector.classList.add("buy-sell-sector-selected")
    finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

    // buy_sell_input_field.addEventListener("input", () => {
    //     const fieldValue = buy_sell_input_field.value
    //     const fieldBool = /^[a-zA-Z]+$/.test(fieldValue)
    //     // console.log(fieldBool)
    //     if (!(fieldBool)) {
    //         var modifiedVal = fieldValue.slice(0, -1)
    //         buy_sell_input_field.value = modifiedVal
    //     }
    // })
    // TODO: The search field value is taking the old value before modfication
    console.log(buy_sell_input_field.value)
    dbf.collection('buyers_requests').get().then((snapshot) => {
        const allBuyerRequests = snapshot.docs.map(doc => doc.data())
        let matches = allBuyerRequests.filter(company => {
            const regex = new RegExp(`^${searchText}`, 'gi')
            return company.companyName.match(regex)
        })
        if (buy_sell_input_field.value.length === 0) {
            matches = []
        }

        if (buy_sell_input_field.value == "") {
            const HTML = `<tr>
                <td class="table_company_number"></td>
                <td class="table_username"></td>
                <td><span>
                        <div class="table-company-logo"></div>
                    </span></td>
                <td>
                    <span class="table-company-name"></span>
                </td>
                <td class="table_company_sector"></td>
                <td class="table_company_price"></td>
                <td class="table_company_quantity"></td>
                <td class="table_company_date"></td>
                <td class="table_company_userpremium"></td>
                <td><button class="table-trade-btn btn">Exchange</button></td>
            </tr>`

            const table_company_number = document.getElementsByClassName("table_company_number")
            const table_username = document.getElementsByClassName("table_username")
            const table_company_logo = document.getElementsByClassName("table-company-logo")
            const table_company_name = document.getElementsByClassName("table-company-name")
            const table_company_sector = document.getElementsByClassName("table_company_sector")
            const table_company_quantity = document.getElementsByClassName("table_company_quantity")
            const table_company_price = document.getElementsByClassName("table_company_price")
            const table_company_date = document.getElementsByClassName("table_company_date")
            const table_company_userpremium = document.getElementsByClassName("table_company_userpremium")

            dbf.collection('buyers_requests').get().then((snapshot) => {
                const allBuyerRequestsNofilter = []
                const allBuyerRequests = snapshot.docs.map(doc => doc.data())

                for (var i = 0; i < allBuyerRequests.length; i++) {
                    table_row_container.innerHTML += HTML
                    allBuyerRequestsNofilter.push(allBuyerRequests[i])
                }
                const all_companies = []
                async function getJson() {
                    const res = await fetch("../2nd/companies.json")
                    const companies = await res.json()

                    let matches = companies.filter(company => {
                        return company
                    })

                    for (var i = 0; i < allBuyerRequestsNofilter.length; i++) {
                        var fullUsername = allBuyerRequestsNofilter[i]['username']
                        const strlen = fullUsername.length - 3
                        var cutUsername = fullUsername.substring(0, strlen) + "***"
                        table_username[i].innerHTML = cutUsername
                        table_company_name[i].innerHTML = allBuyerRequestsNofilter[i]['companyName'][0].toUpperCase() + allBuyerRequestsNofilter[i]['companyName'].slice(1)
                        table_company_sector[i].innerHTML = allBuyerRequestsNofilter[i]["companySector"][0].toUpperCase() + allBuyerRequestsNofilter[i]["companySector"].slice(1)
                        table_company_price[i].innerHTML = allBuyerRequestsNofilter[i]["companyPrice"]
                        table_company_quantity[i].innerHTML = allBuyerRequestsNofilter[i]['shareQuantity']
                        table_company_date[i].innerHTML = allBuyerRequestsNofilter[i]['requestedDate']
                        table_company_userpremium[i].innerHTML = allBuyerRequestsNofilter[i]['userPremium'] + " " + "ETB"
                        table_company_number[i].innerHTML = i + 1

                        // TODO: Logo not working
                        // const ref = dbs.ref()
                        // ref.child("company_logos/" + allBuyerRequestsNofilter[i]['companyName'] + ".png").getDownloadURL().then((url) => {
                        //     table_company_logo[i].setAttribute("style", `background-image: url(${url})`)
                        // })
                    }
                }
                getJson()
            })

        }
        for (var i = 0; i < matches.length; i++) {
            var fullUsername = matches[i]['username']
            const strlen = fullUsername.length - 3
            var cutUsername = fullUsername.substring(0, strlen) + "***"
            const HTML = `<tr>
                <td class="table_company_number">${i + 1}</td>
                <td class="table_username">${cutUsername}</td>
                <td><span>
                                <div class="table-company-logo"></div>
                                </span></td>
                            <td>
                                <span class="table-company-name">${matches[i]['companyName'][0].toUpperCase() + matches[i]['companyName'].slice(1)}</span>
                            </td>
                            <td class="table_company_sector">${matches[i]["companySector"][0].toUpperCase() + matches[i]["companySector"].slice(1)}</td>
                            <td class="table_company_price">${matches[i]["companyPrice"]}</td>
                            <td class="table_company_quantity">${matches[i]["shareQuantity"]}</td>
                            <td class="table_company_date">${matches[i]["requestedDate"]}</td>
                            <td class="table_company_userpremium">${matches[i]['userPremium'] + " " + "ETB"}</td>
                            <td><button class="table-trade-btn btn">Exchange</button></td>
                        </tr>`

            table_row_container.innerHTML += HTML
        }
    })

}

buy_sell_input_field.addEventListener("input", () => buysellSearchCompanies(buy_sell_input_field.value))
// Search bar end