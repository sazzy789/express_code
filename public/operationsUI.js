async function sendRequest() {
    const response = await axios.post("http://localhost:8082/sum",{
        n1 : document.getElementById("firstNum").value,
        n2 : document.getElementById("secondNum").value
    })
    const data = response.data;
    document.getElementById("sumResult").innerText = "Your sum is: " + data.result;
}