import { observable, action } from 'mobx';
import Api from '../libs/Api';

class UtilityStore{

    @observable connection_status;

    @observable list_contacts;
    @observable list_departments;
    @observable list_areas;
    @observable list_users;
    @observable list_vendors;
    @observable list_asset_items;
    @observable list_progress_status;
    @observable list_urgency_status;
    @observable list_sender_status;
    @observable list_devices;

    @observable company_name;
    
    @observable language;
    @observable btnLang;

    @action getListContacts(building_id){

        let params = {
            // user_id: user_id
            building_id: building_id
        };

        // alert(JSON.stringify(params))
        this.list_contacts = [];
        return Api.post('contacts-by-user', params).then(resp =>{
            this.list_contacts = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getListDepartments(user_id){

        let params = {
            user_id: user_id
        };

        // alert(JSON.stringify(params))
        this.list_departments = [];
        return Api.post('departments', params).then(resp =>{
            this.list_departments = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getListAreas(building_id){

        let params = {
            building_id: building_id
        };

        // alert(JSON.stringify(params))
        this.list_areas = [];
        return Api.post('areas-by-building', params).then(resp =>{
            this.list_areas = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getListUsers(building_id){

        let params = {
            building_id: building_id
        };

        // alert(JSON.stringify(params))
        this.list_users = [];
        return Api.post('users-list', params).then(resp =>{
            this.list_users = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getListVendors(user_id){

        let params = {
            user_id: user_id
        };

        // alert(JSON.stringify(params))
        this.list_vendors = [];
        return Api.post('vendors-by-company', params).then(resp =>{
           
            this.list_vendors = resp;
            // alert(JSON.stringify(this.list_vendors))
        });

    }

    @action getListAssetItems(company_id, area_id){

        let params = {
            company_id: company_id,
            area_id: area_id,
        };

        // alert(JSON.stringify(params))
        this.list_asset_items = '';
        return Api.post('workorder-list-assets', params).then(resp =>{
            this.list_asset_items = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getLisProgressStatus(){

        // alert(JSON.stringify(params))
        this.list_progress_status = [];
        return Api.get('progress-statuses').then(resp =>{
            this.list_progress_status = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getListUrgencyStatus(){

        // alert(JSON.stringify(params))
        this.list_urgency_status = [];
        return Api.get('color-statuses').then(resp =>{
            this.list_urgency_status = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getListStatusSenderComplaint(){

        // alert(JSON.stringify(params))
        this.list_sender_status = [];
        return Api.get('status-sender-complaints').then(resp =>{
            this.list_sender_status = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    @action getCompanyName(building_id){

        let params = {
            building_id: building_id
        };

        // alert(JSON.stringify(params))
        this.company_name = '';
        return Api.post('buildings-company', params).then(resp =>{
            this.company_name = resp.name;
        });

    }

    @action getListDevices(building_id){

        let params = {
            building_id: building_id
        };

        // alert(JSON.stringify(params))
        this.list_devices = [];
        return Api.post('buildings-device', params).then(resp =>{
            this.list_devices = resp;
            // alert(JSON.stringify(this.tickets))
        });

    }

    
    

    
}

const utilityStore = new UtilityStore();
export default utilityStore;