import { apiDomain } from "./api";


export const deleteDaily = async (id) => {
    const Token = localStorage.getItem('accessToken');
    const response = await fetch(`${apiDomain}/api/daily-study/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 204) {
        return { success: true };
    }

    try {
        const text = await response.text();
        return text ? JSON.parse(text) : { success: true };
    } catch (err) {
        console.error("Failed to parse JSON:", err);
        return { success: false, error: "Invalid response from server" };
    }
};
