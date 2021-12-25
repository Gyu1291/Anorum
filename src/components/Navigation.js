import react from "react";
import {Link} from "react-router-dom";
import 'styles.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStackExchange, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Navigation = () =>
<nav>
    
    <ul style={{display:'flex', justifyContent: 'center', marginTop: 50} }>
        <li>
            <Link to="/" style={{marginRight: 25}}>
                <FontAwesomeIcon icon={faStackExchange} color="#04AAFF" size="2x" />
            </Link>
        </li>
        <li>
            <Link to="/profile" style={{marginLeft: 25,
                display: 'flex',
                flexDirection:'column',
                alignItems:'center',
                fontSize: 12, }} >
                <FontAwesomeIcon icon={faUser} color="#04AAFF" size="2x" />
                <span style={{marginTop: 10}}>
                    Profile
                </span>
            </Link>
        </li>
    </ul>
</nav>;




export default Navigation;