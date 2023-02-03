import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    per_page: 12,
    key: '33291207-3370922a629314fc6e23b9ee8',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: { q, page },
  });
  return data;
};
