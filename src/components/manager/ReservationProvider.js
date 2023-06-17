import { getToken } from "./TokenProvider"

export const requestSwap =(id, object) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/properties/${id}/make_reservation`, {
        method: "POST",
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
        .then(response => response.json())}
export const cancelSwap =(id) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/properties/${id}/cancel_reservation`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        }

export const getMySwaps =() => {
    let token = getToken()
    return fetch("https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations/my_swaps", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSwapByProperty = (id) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations?property=${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSwapBySwapperProperty = (id) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations?swapper_property=${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSwapsBySwapper =(id) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations?swapper=${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getMySwapsByStatus =(status) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations/my_swaps?status=${status}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export const approveSwap =(id) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations/${id}/approve`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        }
export const denySwap =(id) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/reservations/${id}/deny`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
                }
            })
                }