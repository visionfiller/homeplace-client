export const createUser = ( user ) => {
    return fetch("https://homeplace-server-8a8a3a38456a.herokuapp.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
export const loginUser = (user) => {
    return fetch("https://homeplace-server-8a8a3a38456a.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
