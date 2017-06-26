export const checkServerResponse = (obs) => {
    return obs.map(data => {
        if (data && data.success) {
            return data;
        }
        else if (data && data.errors) {
            throw data.errors;
        }
        return data;
    });
};
//# sourceMappingURL=epic.utilities.js.map