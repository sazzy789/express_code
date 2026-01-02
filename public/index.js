async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    //axios lib
    await axios.post('http://localhost:8000/signup', {
        username: username,
        password: password,
    });
    alert("signed up successfully");
}

async function signin() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    const resposne = await axios.post('http://localhost:8000/signin', {
        username: username,
        password: password,
    });
    // const token = resposne.data.token;
    localStorage.setItem("token", resposne.data.token);
    alert("You are signed in")
    console.log(resposne);
}

async function getUserInformation() {
    const resposne = await axios.get('http://localhost:8000/me', {
        headers: {
            authorization: localStorage.getItem("token")
        }
    });
    console.log(resposne);
    
    document.getElementById("information").innerHTML = resposne.data.username;
}