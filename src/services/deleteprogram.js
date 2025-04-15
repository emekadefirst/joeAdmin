import { apiDomain } from "./api";


export const deleteProgram = async (id) => {
    const Token = localStorage.getItem('accessToken');
    const response = await fetch(`${apiDomain}/api/programs/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json',
        },
    });

    // Handle 204 No Content or empty response
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
