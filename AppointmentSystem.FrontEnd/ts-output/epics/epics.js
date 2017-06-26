import { combineEpics } from 'redux-observable';
import userEpic from './user.epic';
import opportunityEpic from './opportunity.epic';
import technologyEpic from './technology.epic';
const root = combineEpics(userEpic, opportunityEpic, technologyEpic);
export default root;
//# sourceMappingURL=epics.js.map