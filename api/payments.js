import http from "./base";
import { Alert } from "react-native";

class PaymentService{
    constructor(){}


    async getPublisherKey() {
        const url = `payments/publisherKey`;
        var response = "";
        await http
            .get(url,{
            })
            .then(responseData => {
                response = responseData.data.data;
            })
            .catch(error => {
                response = error;
                Alert.alert("there was an error. Please try again later")
            })

        return response;
    }

    async createPaymentIntent(details) {
        const url = `orders/create-payment-intent`;
        var response = "";
        await http
            .post(url,details,{

            })
            .then(responseData => {
                console.log('Api success')
                response = responseData.data.data;
            })
            .catch(error => {
                response = error;
                console.log(error);
                Alert.alert("there was an error. Please try again later")
            })

        return response;
    }

   


}

let service = new PaymentService();
export default service;