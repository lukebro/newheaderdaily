import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
// add all icons we use
library.add(faTwitter);
function Icon(props) {
    return _jsx(FontAwesomeIcon, __assign({}, props));
}
export default Icon;
//# sourceMappingURL=icon.js.map