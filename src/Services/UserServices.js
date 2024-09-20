import axios from "axios";
import {URL} from './config';

class UserServices{
    static fetchAllUser(){
        return axios.get(URL+'/user')
    }
    static fetchUserById(id){
        return axios.get(URL+"/user"+id)
    }
    static addUser(user){
        return axios.post(URL+'/user', user)
    }
    static GetUserByRole(roleName){
        return axios.get(URL+"/user/role", +roleName)
    }
}
export default UserServices;