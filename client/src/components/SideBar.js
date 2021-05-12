import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SideBar extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div id="sidebar-container">
                    <div className="sidebar-link-container"><Link to="/">Home</Link></div>
                    <div className="sidebar-link-container"><Link to="/add_new_set">Add New Set</Link></div>
                    <div className="sidebar-link-container"><Link to="/sold">Sold Sets</Link></div>
                    <div className="sidebar-link-container"><Link to="/search_by_part">Search Parts</Link></div>
                    <div className="sidebar-link-container"><Link to="/missing_parts">Missing Parts</Link></div>
                    <div className="sidebar-link-container"><Link to="/update_log">Updates</Link></div>

                </div> 
            </div>
        );
    }
}
 
export default SideBar;