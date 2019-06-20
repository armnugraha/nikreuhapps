import { observable, action } from 'mobx';
import Api from '../libs/Api';

class UserStore{

    @observable landingpage;

    @observable user_id;
    @observable user_name;
    @observable user_can_login;


    @action login(username, password){

        let params = {
            email: username,
            password: password,
        };

        return Api.post('sign-in', params).then(resp =>{
            this.user_id = resp.user_id;
            this.user_name = resp.username;
            this.user_can_login = resp.can_login;
        });

    }
}

const userStore = new UserStore();
export default userStore;