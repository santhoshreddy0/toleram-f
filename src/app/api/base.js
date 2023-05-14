const apiWrapper = async (url,method, body={}, token = "") => {
    let myHeaders = new Headers();
    myHeaders.append("token", token);
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');

    let requestOptions = {
        mode:'no-cors',
        method: method,
        headers: myHeaders,
    };
    if (Object.keys(body).length>0) {
        requestOptions['body'] = body;
    }

    const res = await fetch(url, requestOptions)
        .then(response => response.json())
    return res
}

export default apiWrapper;
