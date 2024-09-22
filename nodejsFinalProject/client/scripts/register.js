const url = "http://localhost:3000/api/auth/register"


const register_handler = async () => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let age = Number(document.getElementById("age").value);
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let { data: response } = await axios.post(url, {
        fname: fname,
        lname: lname,
        age: age,
        address: address,
        email: email,
        username: username,
        password: password,
    })
    console.log(response)
}



document.getElementById("register_btn").addEventListener("click", register_handler)