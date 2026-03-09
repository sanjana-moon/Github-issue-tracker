const loadSpinner = document.getElementById("load-spinner")
const showSpinner = () => {
    loadSpinner.classList.remove("hidden")
}
const hideSpinner = () => {
    loadSpinner.classList.add("hidden")
}

document.getElementById('sign-in-btn').addEventListener("click", function () {
    const inputName = document.getElementById("name")
    const inputPass = document.getElementById("pass")

    const name = inputName.value;
    const pass = inputPass.value;

    if (name === "admin" && pass === "admin123") {
        showSpinner()
        alert("Sign-in Successful");
        window.location.assign("./main.html")
        hideSpinner
    }

    else {
        showSpinner()
        alert("Sign-in Failed");
        hideSpinner()
    }
})