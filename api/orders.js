import http from "./base";

class OrderService{
    constructor(){}


    async saveNewOrder(body) {
        const url = `orders`;
        var response = "";
        await http
            .post(url, body,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                  },
            })
            .then(responseData => {
                response = responseData.data.data;
            })
            .catch(error => {
                response = error;
            })

        return response;
    }

    async cancelOrder(id,body){
        const url = `orders/cancel/`+id;
        var response = "";
        await http
            .post(url,body,{
            })
            .then(responseData => {
                console.log('successfully cancelled')
                response = responseData.data.data;
            })
            .catch(error => {
                if( error.response?.status === 409 ){
                    throw new Error("Your order has already been accepted and can\'t be canceled")
                }
                throw new Error("There was an issue with the cancel. Please try again")
            });

        return response;
    }

    async acceptOrder(id,body){
        const url = `orders/accept/`+id;
        var response = "";
        await http
            .post(url,body,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                  },
            })
            .then(responseData => {
                response = responseData.data.data;
            })
            .catch(error => {
                response = error;
            });

        return response;
    }

    async deleteOrderByID(id) {
        const url = `orders/`+id;
        var response = "";
        await http
            .delete(url,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                  },
            })
            .then(responseData => {
                response = responseData.data.data;
            })
            .catch(error => {
                response = error;
            });

        return response;
    }



}

let service = new OrderService();
export default service;



