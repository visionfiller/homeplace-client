export const getToken=() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    return HomePlaceUserObject.auth_token
}
