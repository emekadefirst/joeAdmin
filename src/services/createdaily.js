import { apiDomain } from "./api";


const CreateDailyService = async (data) => {
    const Token = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${apiDomain}/api/daily-study`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
                'Authorization': `Bearer ${Token}`, 
            },
            body: JSON.stringify(data),  
        });

        if (!response.ok) {
            const errorDetails = await response.text();  
            console.error(`Error: ${response.status} ${response.statusText}`, errorDetails);
            throw new Error(`Failed to create Program: ${response.status} ${response.statusText}. ${errorDetails}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating Program:", error);
        throw error;
    }
};

export default CreateDailyService; 
