import axios from 'axios';

const baseUrl = 'https://api.cuevana3.io';

export const getCuevanaLinks = async (movieId) => {
  try {
    const response = await axios.get(`${baseUrl}/movie/${movieId}/links`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Cuevana links:', error);
    return [];
  }
};
