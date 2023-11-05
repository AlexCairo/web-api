const pedidoModel = require('../models/pedido.model');
require('dotenv').config();
const axios = require("axios");

const controller = {
    async guardar(req, res) {
        const { clienteId, total, detalle } = req.body;
        try {
            const nPedido = new pedidoModel();      
            nPedido.clienteId = clienteId;
            nPedido.total = total;
            nPedido.detalle = detalle;
            const result = await nPedido.save();
            const order = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: total
                        }
                    },
                ],
                application_context: {
                    brand_name: "CYBER",
                    landing_page: "NO_PREFERENCE",
                    user_action: "PAY_NOW",
                    return_url: `${process.env.HOST}/api/pedidos/capture-order/${result._id}`,
                    cancel_url: `${process.env.HOST}/api/pedidos/cancel-order/${result._id}`
                }
            }       

            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');

            const { data: {access_token}} = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
                auth: {
                    username: process.env.PAYPAL_API_CLIENT,
                    password: process.env.PAYPAL_API_SECRET
                }
            })

            const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            res.send(response.data);

        } catch (error) {
            console.log("Error => ", error);
            res.status(500);
        }
    },    

    async captureOrder(req,res){
        const { orderId } = req.params;
        const { token } = req.query;
        await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {}, {
            auth: {
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET
            }
        });
        try {
            const result = await pedidoModel.findById(orderId);
            result.estadoPedido = 'P';
            result.save();
        } catch (error) {
            console.log(error);
        }
        res.redirect(`${process.env.FRONT_END_URL}/order-success`);
    },

    async cancelOrder(req,res){
        const { orderId } = req.params;
        try{
            const result = await pedidoModel.findById(orderId);
            result.estadoPedido = 'A';
            result.save();
        } catch (err) {
            console.log(err);
        }
        res.redirect(`${process.env.FRONT_END_URL}/order-canceled`);
    },

    async listar(req,res){
        try {
            const result = await pedidoModel.find();
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async detallePedido(req,res){
        const {id} = req.params;
        try {
            const result = await pedidoModel.findById(id).populate('clienteId');        
            res.json(result);
        } catch (error) {
            console.log("Error => ",error);
            res.Status(500);
        }
    },
    async eliminarPedido(req,res){
        const {id} = req.params;
        try {
            await pedidoModel.findByIdAndDelete(id);
            res.json({mensaje:"Pedido eliminado"})
        } catch (error) {
            console.log("Error =>", error);
            res.Status(500);
        }
    }
}

module.exports = controller;