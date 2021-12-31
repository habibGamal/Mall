import BackendBranch from "../BackendTypes/BackendBranch"
import Picture from "./Picture"


export default class Branch {
    address: string;
    gps: string;
    id: number;
    logo: Picture;
    name: string;
    short_name: string;
    store_id: 1;
    created_at: string;
    updated_at: string;
    constructor(branch: BackendBranch) {
        this.address = branch.address;
        this.gps = branch.gps;
        this.id = branch.id;
        this.name = branch.name;
        this.short_name = branch.short_name;
        this.store_id = branch.store_id;
        this.created_at = branch.created_at;
        this.updated_at = branch.updated_at;
        this.logo = Picture.getPicture(branch.logo);
    }

}