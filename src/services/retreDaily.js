import { apiDomain } from "./api";


export const retrieveDaily = async (id) => {
    const Token = localStorage.getItem('accessToken');
    const response = await fetch(`${apiDomain}/api/daily-study/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200) {
        return response.json()
    }
    return "No Study found"
};
