import { request } from '../plugins/request'
export const login = (params) => {
    return request.post(
        "/api/users/login",
        params,
    )
}
export const register = (params) => {
    return request.post(
        "/api/users",
        params,
    )
}