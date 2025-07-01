import axios from 'axios';

export const queries = () => {
    return axios
        .get('https://query-nest-server-side.vercel.app/queries',)
        .then(res => res.data);
};
