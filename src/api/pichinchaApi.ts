import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export const pichinchaApi = axios.create({
    /* Conexión a un servidor intermediario porque conexión directa a su servidor 
    me da problemas de CORS. El servidor intermediario se encarga de conectarse a su servidor
    y me trae su respuesta */
    
    baseURL: 'http://localhost:3000/api/datos',
    // baseURL: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipfmsa-productosfinancieros',
    // headers: {
    //     'Content-Type': 'application/json',
    //     authorId: '20230520'
    // }
});