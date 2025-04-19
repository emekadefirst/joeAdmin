import { apiDomain } from "../api";


export async function bulk(upload) {
    return await fetch(`${apiDomain}/api/bulk-upload/`, {
        method: 'POST',
        body: upload,  // Send FormData as the request body
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message);  // Throw error if response is not ok
            });
        }
        return response.json();  // Resolve with the response JSON if successful
    })
    .then(data => data.message)  // Extract message from the response
    .catch(error => {
        console.error("Error uploading file:", error);
        throw error;  // Rethrow the error to be handled by the caller
    });
}
