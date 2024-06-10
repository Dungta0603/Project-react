import { api } from "../../config/api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionTypes";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({type: CREATE_ORDER_REQUEST});
        try {
            const {data} = await api.post(`/api/order`, reqData.order,{
                headers:{
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            // Kiểm tra phản hồi từ backend và chuyển hướng người dùng đến URL thanh toán tương ứng
            if (data.vnpay_url) {
                window.location.href = data.vnpay_url;
            } else if (data.payment_url) {
                window.location.href = data.payment_url;
            } else if (data.paypal_url) {
                window.location.href = data.paypal_url;
            } else {
                console.log("No payment URL returned from backend", data);
            }
            console.log("created order data", data);
            dispatch({type:CREATE_ORDER_SUCCESS, payload:data});
        } catch (error) {
            console.log("error", error);
            dispatch({type:CREATE_ORDER_FAILURE, payload:error});
        }
    };
};

export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({type: GET_USERS_ORDERS_REQUEST});
        try {
            const {data} = await api.get(`/api/order/user`, {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("users order", data);
            dispatch({type: GET_USERS_ORDERS_SUCCESS, payload:data});
        } catch (error) {
            dispatch({type: GET_USERS_ORDERS_FAILURE, payload:error});
        }
    }
}