import React from 'react';

import App from '../components/App';
import SetDetails from '../components/SetDetails';
import AddNewSet from './AddNewSet';
import SearchByPart from './SearchByPart';
import MissingParts from './MissingParts';
import UpdateLog from './UpdateLog';
import SoldSets from './SoldSets';

import {BrowserRouter, Route} from 'react-router-dom';


const AppRouter = ()=>{
    return (
        <BrowserRouter>

            <Route path="/" exact component={App}/>
            <Route path="/set_details/:id" component={SetDetails} />
            <Route path="/add_new_set" component={AddNewSet} />
            <Route path="/search_by_part" component={SearchByPart} />
            <Route path="/missing_parts" component={MissingParts} />
            <Route path="/update_log" component={UpdateLog} />
            <Route path="/sold" component={SoldSets} />

        </BrowserRouter> 
        )
}
export default AppRouter;