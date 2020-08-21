import axios from 'axios';

//criar configuracao da base ulr api
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api; 

