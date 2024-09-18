import axios from "axios";
import {URL} from './config';

class RoleServices{
    static fetchAllRole(){
        return axios.get(URL+'/role')
    }
    static fetchRoleByID(id){
        return axios.get(URL+'role/'+id)
    }
    static addRole(role){
        return axios.post(URL+'role/',role)
    }
}
export default RoleServices;