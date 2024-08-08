import apiPath from "./apiPath";
import { API } from "./axios";

const authService = {
    signIn,
    signUp,
    movieList,
    createMovie,
    updateMovie,
    movieDetails
}

async function signIn(body) {
    const res = await API.post(apiPath.auth.signIn, body);
    debugger
    if (res.status === 200) {
        return res?.data
    }
    return null
}

async function signUp(body) {
    const res = await API.post(apiPath.auth.signUp, body);
    if (res.status === 200) {
        return res?.data
    }
    return null
}

async function movieList(param) {
    const res = await API.post(`${apiPath.movies.list}?${param}`);
    if (res.status === 200) {
        return res?.data
    }
    return null
}

async function movieDetails(id, body) {
    const res = await API.get(`${apiPath.movies.create}/${id}`, body);
    if (res.status === 200) {
        return res?.data
    }
    return null
}

async function createMovie(body) {
    const res = await API.post(`${apiPath.movies.create}`, body);
    if (res.status === 200) {
        return res?.data
    }
    return null
}

async function updateMovie(id, body) {
    debugger
    const res = await API.put(`${apiPath.movies.create}/${id}`, body);
    if (res.status === 200) {
        return res?.data
    }
    return null
}

export default authService;