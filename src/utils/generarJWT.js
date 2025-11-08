import jwt from 'jsonwebtoken';

export const generarJWT = (uid, rol) => {
    return jwt.sign({uid, rol}, process.env.JWT_SECRET, {
       expiresIn: '4h' 
    });
    
};