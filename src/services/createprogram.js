import { apiDomain } from "./api";

export const CreatePrograms = async ({ title }) => {
  const Token = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${apiDomain}/api/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`, 
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create Program: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Program:', error);
    return null;
  }
};
