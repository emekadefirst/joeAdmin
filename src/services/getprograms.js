import apiDomain from "./api";

export const GetPrograms = async () => {
  const Token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${apiDomain}/api/programs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Programs: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching audit Programs:', error);
    return [];
  }
};
