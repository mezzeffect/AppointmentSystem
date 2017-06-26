import axios from 'axios';
export class TechnologyApi {
    static getTechnologies() {
        return axios.get(`${TechnologyApi.opportunityUrl}GetTechnologiesList`);
    }
}
TechnologyApi.opportunityUrl = '/api/Technoologies/';
//# sourceMappingURL=technology.api.js.map