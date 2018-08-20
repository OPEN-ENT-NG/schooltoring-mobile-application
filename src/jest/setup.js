import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.config = { auth: { endpoint: "http://ent3-core.gdapublic.fr" } };
