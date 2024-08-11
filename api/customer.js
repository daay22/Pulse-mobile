import http from "./base";

class CustomerService {
    constructor() { }


    async getVenueInfo(venueID, deviceID = '') {
        const url = `customer/${venueID}/${deviceID}`;
        let response = "";
        try {
            const responseData = await http.get(url, { timeout: 15000 });
            response = responseData.data;
        } catch (error) {
            console.log(error);
            response = error;
        }
        return response;
    }




}

let service = new CustomerService();
export default service;