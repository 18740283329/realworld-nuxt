import { request } from '../plugins/request'
export const updateUserInfo = (params) => {
    return request.put(
        "/api/user",
        params,
    )
}
export const getUserInfo = (username) => {
    return request.get(
        `/api/profiles/${username}`,
    )
}

export const followUser = (username) => {
    return request.post(
        `/api/profiles/${username}/follow`,
    )
}
export const unFollowUser = (username) => {
    return request.delete(
        `/api/profiles/${username}/follow`,
    )
}