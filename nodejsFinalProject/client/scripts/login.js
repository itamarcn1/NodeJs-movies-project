const url = "http://localhost:3000/api/auth/login"


const login_handler = async()=>{
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let {data:response} = await axios.post(url,{
            username: username,
            password: password
    })
    console.log(response)
    if(typeof response == "string"){
        alert(response)
    }else{
        console.log(typeof response);
        localStorage.setItem("token", JSON.stringify(response.token))
        localStorage.setItem("user_id", JSON.stringify(response.user_id))
        setTimeout(()=>{
            window.location.href = "./home.html"
        },500)
    }
}



document.getElementById("login_btn").addEventListener("click", login_handler)