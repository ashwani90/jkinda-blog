import axios from 'axios';
import {getItem} from '@/helpers/persistenceStorage';

axios.defaults.baseURL = "";

axios.interceptors.request.use(config => {
    const token = getItem('accessToken');
    const authorisationToken = token ? `Token ${token}`: '';
    config.headers.Authorization = authorisationToken;
    return config;
})

export default axios;