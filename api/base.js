import axios from "axios";


/*const http = axios.create({
    baseURL: 'https://foobar-app-backend.herokuapp.com/',
    timeout: 1000
  });*/

  const http = axios.create({
    baseURL: 'https://gtqm60dtp7.execute-api.us-east-1.amazonaws.com/dev/api/v1/', 
    timeout: 1000
  });


  export default http;