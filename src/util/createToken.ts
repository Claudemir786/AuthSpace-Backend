import jwt, { type JwtPayload } from 'jsonwebtoken'

export type user ={
    email:string,
    name:string
    id:number
}

export function createToken(user:user):string | boolean{

    console.log("Dados para criação do token: ",user);
    
    const token:string = jwt.sign({email:user.email, id:user.id,name:user.name},process.env.TOKEN!,{expiresIn:"5h"});

    if(!token)return false;
    console.log("token criado com sucesso!");
    return token;
}

export function verifyToken(token:string):boolean | string | object{
    try {

        const verify:string | JwtPayload = jwt.verify(token,process.env.TOKEN!);
        return verify
        
    } catch (error) {
        console.error("Falha ao verificar o token: ", error);
        return false;
    }
    
}

