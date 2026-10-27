import type{ Response,Request } from "express";
import { deleteDataUser, findUser, updateEmailUser, userCreate, userLogin } from "../Repository/UserRepository.js";
 
type bodyLogin ={
    email:string;
    password:string;
    }

type bodyCreate = {
    name:string;
    email:string;
    password:string;
}    


export class User{

   
    async login(req:Request<{},{}, bodyLogin>,res:Response):Promise<Response>{

        try {
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(422).json({success:false, message:"dados enviados incorretamente"});
        }

        const result = await userLogin(email,password);

        if(!result)throw new Error("usuário não foi encontrado na base de dados");

        return res.status(200).json({success:true, message:"usuário encontrado com sucesso", user:result})

        } catch (error) {
            console.error("Falha ao verificar se usuário está logado: ", error);
            return res.status(400).json({success:false, message:"Usuário não encontrado"});
        }
    }

    async create(req:Request<{},{}, bodyCreate>, res:Response):Promise<Response>{
        try {
            
            const {name,email,password} = req.body;
              

            if(!name || !email || !password ){
                return res.status(422).json({success:false, message:"Dados enviados incorretamente"});

            }

            const resultCreate = await userCreate(name,email,password);

            if(!resultCreate)throw new Error("Erro ao criar registro no banco de dados");
            
            return res.status(201).json({success:true,message:"usuário criado com sucesso"});
            
        } catch (error) {
            console.error("Falha ao criar novo usuário na base de dados: ", error);
            return res.status(400).json({success:false, message:"Usuário não pode ser criado"});
        }
    }


    async getUser(req:Request<{},{},{},{id:number}>, res:Response):Promise<Response>{
        try {
            
            const id = req.query.id;

            console.log("Id que chegou: ", id);

            const findedUser:object | boolean = await findUser(id);
            if(!findedUser)throw new Error("Usuário não encontrado");

            return res.status(200).json({success:true, message:"usuário encontrado", user:findedUser});

        } catch (error) {
            console.error("Falha ao buscar usuário na base de dados: ", error);
            return res.status(400).json({success:false, message:"Usuárioo não encontrado"});
        }
    }

    //recebe o email que será alterado
    async updateUser(req:Request<{},{},{email:string, id:number}>, res:Response):Promise<Response>{
        try {

           const{email, id} = req.body;
           
           if(!email || !id){
             return res.status(422).json({success:false, message:"dados enviados incorretamente"});
           }

           const update:boolean = await updateEmailUser(id,email); 
           
           if(!update)throw new Error("update falhou");

           return res.status(200).json({success:true, message:"Email alterado com sucesso!"});

            
        } catch (error) {
            console.error("Não foi possível fazer alteração de email: ", error);
            return res.status(400).json({success:false, message:"Não foi possível alterar email"});
        }
    }

    async deleteUser(req:Request<{},{},{id:number}> ,res:Response):Promise<Response>{
        try {

            const {id} = req.body;
            if(!id)return res.status(422).json({success:false, message:"dados enviados incorretamente"});

            const isDelete:boolean = await deleteDataUser(id);

            if(!isDelete)throw new Error("delete falhou");

            return res.status(200).json({success:true, message:"usuário deletado com sucesso!"});
            
        } catch (error) {
            console.error("Falha ao realizar delete de usuário: ", error);
            return res.status(400).json({success:false, message:"Não foi possível deletar usuário!"});
        }
    }

}