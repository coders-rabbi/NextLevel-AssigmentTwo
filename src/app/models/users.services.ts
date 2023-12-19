import { User } from "./users.interface";
import { UserModel } from "./users.model";


const createUserIntoDB = async(user: User) =>{
    console.log(user);
    const result = await UserModel.create(user);
    return result;
}


export const UserService = {
    createUserIntoDB,
}