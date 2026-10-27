
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../Db/dbConfig.js";
import { comparePassword, hashPassword } from "../util/hashPassword.js";
import { createToken, type user } from "../util/createToken.js";

const pools = pool;

export async function userCreate
(name:string, email:string, password:string)
:Promise<boolean | object>{

    try {

        const passHash:string = await hashPassword(password);

        const [rows] = await pools.query<ResultSetHeader>(`INSERT INTO users (name,email,user_password)
                                        VALUES(?,?,?)`, [name,email,passHash]);

        if(rows.affectedRows === 0)throw new Error("Dados não foram inseridos no banco de dados");
        

        console.log("usuário cadastrado com sucesso na base de dados");

        return true
        
    } catch (error) {
        console.error("Erro ao criar usuário no banco de dados: ", error);
        return false
    }
    
}

type ReadUser = RowDataPacket &{
    id:number,
    name:string,
    email:string,
    user_password:string
}


export async function userLogin
(email:string, password:string)
:Promise<boolean | object | string[] | undefined>{

    try {

        const [resultSelect] = await pools.query<ReadUser[]>(`SELECT * FROM users WHERE email = ?`, [email]);

        if(resultSelect.length === 0)throw new Error("usuário não encontrado");

        const userPassword = resultSelect[0]?.user_password || "";

        const comparePass:boolean = await comparePassword(password,userPassword);

        //se as senhas forem iguais
        if(comparePass){
            
            //preenche os dados do tipo user
            const user:user ={name:resultSelect[0]?.name || "", email:resultSelect[0]?.email || "", id:resultSelect[0]?.id || 0};
            //cria o token
            const token = createToken(user);

            if(!token){
                console.log("O token não foi criado corretamente");
                return false;
            }
            
            console.log("usuário encontrado e senhas coincidem");
            return {id:resultSelect[0]?.id, name:resultSelect[0]?.name,email:resultSelect[0]?.email, token:token};
        }
        return false;

      
    } catch (error) {

        console.error("Usuário não encontrado na base de dados: ", error);
        return false
    }
    
}


export async function updateEmailUser
(userId:number, email:string)
:Promise<boolean>{
    
    try {

        const [rows] = await pools.query<ResultSetHeader>(`UPDATE users SET email = ? WHERE id = ? `, [email, userId]);

        if(rows.affectedRows === 0)throw new Error("nenhuma linha no banco de dados foi afetada");

        console.log("Alteração de e-mail efetuado com sucesso");
        return true
        
    } catch (error) {
        console.error("Erro, não foi possível alterar email de usuário: ", error);
        return false;
    }
}


export async function 
deleteDataUser(id:number)
:Promise<boolean>{

    try {

        const [rows] = await pools.query<ResultSetHeader>(`DELETE FROM users WHERE id = ?`, [id]);

        if(rows.affectedRows === 0)throw new Error("Nenhuma linha do banco de dados foi afetada");
        console.log("Usuário deletado com sucesso!");
        return true;
        
    } catch (error) {
        console.error("Erro, não foi possível realizar a exclusão de usuário no banco de dados: ", error);
        return false;    
    }
    
}

//busca um usário especifico por meio do id
export async function findUser
(id:number)
:Promise<boolean | object >{
    try {

        const [result] = await pools.query<ReadUser[]>(`SELECT * FROM users WHERE id = ?`, [id]);

        if(result.length === 0)throw new Error("Nenhum usuário encontrado");

        return{
            id:result[0]?.id,
            name:result[0]?.name,
            email:result[0]?.email
        }
        
    } catch (error) {
        console.error("Não foi possível encontrar usuário: ", error);
        return false;        
    }
    
}