

const setContainer = async () => {
    let { data: response } = await axios.get("http://localhost:3000/api/products",
        {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("token"))
            }
        })
    console.log(response);
    let container = document.getElementById("container")
    response.forEach(product => {
        container.innerHTML += `
        <ul>
            <li>${product.prod_desc}</li>
            <li>${product.prod_price}</li>        
        </ul>
        `
    });
}

setContainer()
