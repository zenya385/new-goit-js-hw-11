import axios from 'axios';

export default async function fetchImages(images, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=25274379-6b8d04d5236c1ea65da084838&q=${images}&image_type=photo&safesearch=true&orientation=horizontal&per_page=40&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
