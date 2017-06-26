import axios from 'axios';
export class AppointmentApi {
    static getOpportunities(pageNumber = 0, pageSize = 0) {
        return axios.get(`${OpportunityApi.opportunityUrl}getopportunitieslist`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        });
    }
    static getOpportunityById(id) {
        return axios.post(`${OpportunityApi.opportunityUrl}getopportunity`, {
            'id': id
        });
    }
    static searchOpportunities(data) {
        return axios.post(`${OpportunityApi.opportunityUrl}GetOpportunitiesList`, data);
    }
    static updateOpportunity(opportunity) {
        return axios.post(`${OpportunityApi.opportunityUrl}UpdateOpportunity`, opportunity);
    }
}
OpportunityApi.opportunityUrl = '/api/opportunity/';
//# sourceMappingURL=opportunity.api.jsx.map