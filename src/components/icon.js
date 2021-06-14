import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

// add all icons we use
library.add(faTwitter);

function Icon(props) {
    return <FontAwesomeIcon {...props} />;
}

export default Icon;