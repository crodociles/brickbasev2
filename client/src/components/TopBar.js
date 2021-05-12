import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const TopBar = () =>{
    const [showMenu, setShowMenu] = useState(false);

    return(
        <div id="tb-container">
            <div id="tb-logo-burger">
                <div id="tb-logo-container" onClick={()=>{setShowMenu(false)}} >
                    <Link to="/" id="tb-logo">BrickBase</Link>
                </div>
                <div id="nav-icon4" onClick={()=>{setShowMenu(!showMenu)}} className={showMenu?"open":""}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="tb-drop-menu" className={showMenu?"show-menu":"hide-menu"}>
                <div className="tb-link-container"><Link to="/">Home</Link></div>
                <div className="tb-link-container"><Link to="/add_new_set">Add New Set</Link></div>
                <div className="tb-link-container"><Link to="/sold">Sold Sets</Link></div>
                <div className="tb-link-container"><Link to="/search_by_part">Search Parts</Link></div>
                <div className="tb-link-container"><Link to="/missing_parts">Missing Parts</Link></div>
                <div className="tb-link-container"><Link to="/update_log">Updates</Link></div>
            </div>
        </div> 
    )
}

export default TopBar;