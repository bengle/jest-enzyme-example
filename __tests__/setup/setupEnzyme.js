const _ = require("lodash");
const originalConsoleError = console.error;
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
// 解决jsdom parse css报错问题
console.error = function(msg) {
  // if (_.startsWith(msg, '[vuex] unknown')) return
  if (_.startsWith(msg, "Error: Could not parse CSS stylesheet")) return;
  originalConsoleError(msg);
};
