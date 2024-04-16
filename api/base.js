import axios from "axios";


/*const http = axios.create({
    baseURL: 'https://foobar-app-backend.herokuapp.com/',
    timeout: 1000
  });*/

  const http = axios.create({
    baseURL: 'http://192.168.1.198:8000/api/v1/', 
    timeout: 1000
  });


  export default http;