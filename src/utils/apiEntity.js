import http, {API_URL} from "../services/http";

export class ApiEntity {

    entity;

    constructor(entity) {
        this.entity = entity;
    }

    fetchEntities = async (page = 1) => {
        try {
            let {data} = await http.get(`${API_URL}${(this.entity)}?page=${page}`);
            return data['data'] || null;
        } catch (e) {
            return null;
        }
    };

    updateEntity = async (id, form) => {
        try {
            // console.log("Form", form, id);
            let {data} = await http.put(`${API_URL}${this.entity}/${id}/update`, form);
            return data['data'] || null;
        } catch (e) {
            return null;
        }
    };


    addEntity = async (formData) => {
        try {
            let {data} = await http.post(`${API_URL}${this.entity}/add`, formData);
            return data['data'] || null;
        } catch (e) {
            return null;
        }
    }

}



