import api from "../services/githubApi";

export const getUserRepos = async(username) =>{
    const response = await api.get(
        `/user/${username}/repos`
    );

    return response.data;
};

export const getUserProfile = async (username) => {
    const response = await api.get(
        `/user/${username}`
    );

    return response.data;
};
