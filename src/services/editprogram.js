import { apiDomain } from "./api";

export const editProgram = async (id, data) => {
    const Token = localStorage.getItem('accessToken');
    if (!Token) {
        console.warn("No access token found.");
        return { success: false, error: "Unauthorized" };
    }

    const response = await fetch(`${apiDomain}/api/programs/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const text = await response.text();
        const parsed = text ? JSON.parse(text) : null;

        if (response.ok) {
            return { success: true, data: parsed };
        } else {
            return { success: false, error: parsed?.message || "Update failed" };
        }
    } catch (err) {
        console.error("Failed to parse JSON:", err);
        return { success: false, error: "Invalid response from server" };
    }
};
