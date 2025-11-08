import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Usuarios from '../db/usuarios.js';

export default class AuthServicio {
    constructor() {
        this.usuarios = new Usuarios();
    }
    verificarAcceso = async (acceso) => {
        //verifica si existe el usuario
        const row = await this.usuarios.buscarUsuarioAcceso(acceso.usuario);
        if (!row) return null;//acceso incorrecto
        //verifica si la contraseña es valida
        let passwordValido = false;
        const stored = row['contrasenia'] ? String(row['contrasenia']) : '';

        // Si la contraseña guardada es bcrypt (comienza con $2...) comparamos el plain enviado contra el hash guardado
        //verificar como se crear la contraseña
        if (stored.startsWith("$2")) {
            passwordValido = await bcrypt.compare(acceso.password, stored);
        } else {
            // Si no es bcrypt, puede ser MD5 o texto plano
            const md5Hash = crypto.createHash("md5").update(String(acceso.password)).digest("hex");
            passwordValido = stored === String(acceso.password) || stored === md5Hash;
        }
        //verifica si el acceso es correcto o no
        if(!passwordValido){
            return null;//acceso incorrecto
        }
        //asigno el rol segun el tipo de usuario
        let rol = "cliente";
        if(row["tipo_usuario"] === 1) rol = "admin";
        else if (row["tipo_usuario"] === 2) rol = "empleado";
        row["tipo_usuario"] = rol;
        //asigno un token al acceso valido
        const token = jwt.sign(
            {
                id: row["usuario_id"],
                nombre: row["nombre"]+" "+row["apellido"],
                nombre_usuario: row["nombre_usuario"],
                rol: rol,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        return {row,token};
    }

}