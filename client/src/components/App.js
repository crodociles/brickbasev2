import React from 'react';
import TopBar from './TopBar'
import SideBar from './SideBar';

import HomeSetDisplay from './HomeSetDisplay'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss'

const App = () => {
    return (
            <div>
                <TopBar/>
                <SideBar />
                <HomeSetDisplay />
            </div>
    )
}

export default App;