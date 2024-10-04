import axios from "axios";
import {URL} from './config';

class EmailServices{
    static resetPasswordEmail(email) {
        return axios.post(URL+'/email/request-password-reset', { email });
    }
}
export default EmailServices;