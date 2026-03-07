document.getElementById('sign-in-btn').addEventListener("click",function(){
    const inputName = document.getElementById("name")
    const inputPass = document.getElementById("pass")
    
    const name = inputName.value;
    const pass = inputPass.value;

    if(name === "admin" && pass === "admin123"){
        alert("Sign-in Successful");
        window.location.assign("./main.html")
    }

    else{
        alert("Sign-in Failed");
    }
})