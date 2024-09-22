

const setContainer = async () => {
    let { data: response } = await axios.get("http://localhost:3000/api/auth/userSettings",
        {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("token")),
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            },

        })
    console.log(response);
    let container = document.getElementById("container")
    container.innerHTML += `
        <ul>
            <li>"username:" ${response.username} </li>
            <li>"city:" ${response.city}</li>
            <li>"fname:"${response.fname}</li>
            <li>"lname:" ${response.lname}</li>
            <li>"age:" ${response.age}</li>  
            <input id="current_password_input" type="text" placeholder="enter current password"/>
            <button id="password_edit_verify">submit</button>        
        </ul>
        `
    document.getElementById("password_edit_verify").addEventListener("click", verify_password)

}


setContainer()


const verify_password = async () => {
    let current_password = document.getElementById("current_password_input").value
    let { data: response } = await axios.get("http://localhost:3000/api/auth/passwordAuth",
        {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("token")),
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "password": current_password
            },

        })
        if (response === "password match!!!!") {
            alert("Password matches! You can proceed to change your password.");
            let { data: user } = await axios.get("http://localhost:3000/api/auth/")
            let container = document.getElementById("container");
            container.innerHTML += `
                <ul>
                    <li>"username:" ${user.username} </li>
                    <li>"city:" ${user.city}</li>
                    <li>"fname:"${user.fname}</li>
                    <li>"lname:" ${user.lname}</li>
                    <li>"age:" ${user.age}</li>  
                    <input id="new_password_input" type="text" placeholder="enter new password"/>
                    <button id="password_change_btn">submit</button>        
                </ul>
            `;
        } else {
            alert("Password does not match. Please try again.");
        }
    };

















