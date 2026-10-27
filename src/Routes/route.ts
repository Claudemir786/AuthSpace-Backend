import { Router } from "express";
import { User } from "../Controller/userController.js";

 const router = Router();

const user = new User();


router.get("/", (req,res)=>{
    console.log("olá essa é a rota de teste");
    return res.status(200).json({success:true, message:"sucesso!!"});
});

//verifica se o usuário existe para realizar o login
router.post("/api/login", user.login);

//crui um usuário na base de dados
router.post("/api/create", user.create);

//busca um usuário via id
router.get("/api/get/user", user.getUser);

//altera email de usuário
router.put("/api/update/email", user.updateUser);

//deleta usuário 
router.delete("/api/delete/user", user.deleteUser);

export default router;