import { request } from '../plugins/request'

export const getArticles = (params) => {
    return request.get(
        "/api/articles",
        { params },
    )
}

export const getFeedArticles = (params) => {
    return request.get(
        "/api/articles/feed",
        { params },
    )
}

export const getTags = () => {
    return request.get(
        '/api/tags',
    )
}

export const favoriteArticle = (slug) => {
    return request.post(
        `/api/articles/${slug}/favorite`,
    )
}

export const unFavoriteArticle = (slug) => {
    return request.delete(
        `/api/articles/${slug}/favorite`,
    )
}

export const createArticle = (params) => {
    return request.post(
        '/api/articles',
        params
    )
}

export const getArticleDetails = (slug) => {
    return request.get(
        `/api/articles/${slug}`,
    )
}

export const updateArticle = (params) => {
    return request.put(
        `/api/articles/${params.slug}`,
        params
    )
}

export const deleteArticle = (slug) => {
    return request.delete(
        `/api/articles/${slug}`,
    )
}


export const addComment = (slug, params) => {
    return request.post(
        `/api/articles/${slug}/comments`,
        params
    )
}

export const getComments = (slug) => {
    return request.get(
        `/api/articles/${slug}/comments`,
    )
}

export const deleteCommen = (slug, id) => {
    return request.delete(
        `/api/articles/${slug}/comments/${id}`,
    )
}

