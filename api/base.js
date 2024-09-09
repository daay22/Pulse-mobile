import axios from "axios";


/*const http = axios.create({
    baseURL: 'https://gtqm60dtp7.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
    timeout: 10000
  });*/

  const http = axios.create({
    baseURL: 'https://gtqm60dtp7.execute-api.us-east-1.amazonaws.com/dev/api/v1/', 
    timeout: 10000
  });


  export default http;