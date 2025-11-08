import AuthServicio from '../services/authServicio.js';

export default class AuthControlador {
    constructor() {
        this.authServicio = new AuthServicio();
    }
    verificarAcceso = async (req, res) => {
        const { body } = req;
        const acceso = {
                usuario: body.usuario,
                password: body.password,
            };
        try {
            const estadoAcceso = await this.authServicio.verificarAcceso(acceso);
            if (estadoAcceso){
                res.status(200).json({
                    status: true,
                    message: "Login exitoso",
                    token : estadoAcceso.token,
                    usuario : estadoAcceso.row 
                });
            }else{
                res.status(401).json({
                    status: false,
                    message: "Acceso incorrecto",
                });
            }
        } catch (error) {
            res.status(error?.status || 500).send({ 
                    status:false,
                    data: { error: error?.message || error,errorDetails: error.message }
                });
        }
    }
}