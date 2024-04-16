import http from "./base";

class CustomerService{
    constructor(){}


    async getVenueInfo(venueID,deviceID='') {
        const url = `customer/${venueID}/${deviceID}`;
        var response = "";
        await http
            .get(url,{
            })
            .then(responseData => {
                response = responseData.data;
            })
            .catch(error => {
                console.log(error)
                response = error;
            })

        return response;
    }

   


}

let service = new CustomerService();
export default service;