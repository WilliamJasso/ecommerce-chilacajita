import express  from 'express';
import cors  from 'cors';


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-435703481240166-052017-0797389a5735a6d1a1c4f1b3cddcb5a6-565630372' });

const app =  express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get( '/', (req, res) => {
    res.send("Soy el server: ");
});

app.post("/create_preference", async(req,res)=>{
    try{
    const body = {
        items: [{
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
            currency_id: "MXN",

        },],
        back_urls: {
            success: "https://williamjasso.github.io/ecommerce-chilacajita/index.html",
            failure: "https://williamjasso.github.io/ecommerce-chilacajita/index.html",
            pending: "https://williamjasso.github.io/ecommerce-chilacajita/index.html",
        },
        auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
        id: result.id,
    })
    }catch{
console.log(error)
res.status(500).json({
    error: "Error al crear el pago"
    })
}
});

app.listen(port, () => {
    console.log('El servidor esta corriendo en el puerto ${port}');
})
