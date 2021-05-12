import React from 'react';
import TopBar from './TopBar'

export default function UpdateLog(){
    return (
        <div>
            <TopBar/>
            <div id="log-container">
                <h1>Updates</h1>
                <h4>16/03/2021</h4>
                <ul>
                    <li>Migrated to BrickBaseV2</li>
                </ul>
            </div>
        </div>
    )
}