import bcrypt, {hash} from 'bcrypt'


//quantidade que o algoritimo vai embaralhar a senha
const saltCounts:number = 10;

//cria se nha embaralhada
export async function hashPassword(password:string):Promise<string>{

    return await bcrypt.hash(password, saltCounts);

}



//compara a senha embaralhada 
export async function comparePassword(password:string, hashPassword:string):Promise<boolean>{
    
    return await bcrypt.compare(password,hashPassword);

}

