import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apirepository.ncdc.go.ug/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getFoldersAndFiles = ( parentId = '' ) => {
  // if( parentId ) {
  return api.get(`/folders/`);
  // }
  // return api.get(`/folders`);
}

export const getFiles = ( parentId = '' ) => {
  return api.get( `/files/folder/${parentId}` );
}
  
export const createFolder = (data) => api.post('/folders', data);
export const uploadFile = (formData) =>
  api.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export default api;