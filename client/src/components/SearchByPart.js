import React, { useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
// import SearchByPartItem from './SearchByPartItem';
import {Link} from 'react-router-dom';


import {readAllSetData, readSetParts} from '../utils/mysql/read';

// import {PulseLoader} from 'react-spinners';

const SearchByPart = () =>{

    const [searchStr, setSearchStr] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [matchingSets, setMatchingSets] = useState([]);

    const rBApiKey = "425f1f6afea9cc8b0a035d9ffdfb136c";

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        // get part details from rebrickable
        return fetch("https://rebrickable.com/api/v3/lego/parts/" + searchStr + "/?key=" + rBApiKey)
        .then(response=>response.json())
        .then(response=>{
            //set details to state & reset matchingSets from last search
            setSearchResults(response);

            // reset matchingSets for next search
            setMatchingSets([]);

            // get sets in db
            readAllSetData().then(res=>{

                //loop through sets
                res.response.forEach((item)=>{
                    let flag = false;

                    //get set parts table data
                    readSetParts(item.id)
                    .then(res=>{
                        const setParts = [];

                        //loop through parts
                        res.response.forEach(element => {

                            //if part is in set then details to array
                            if(element.part_num === searchStr){
                                flag = true;
                                setParts.push(
                                    <div>{element.quant_in_set}/{element.quant} in {element.color}</div>
                                    );
                            }
                        })

                        // if parts match flag is set then add to matchingSets
                        if(flag){
                            setMatchingSets(prev=>{
                                return ([...prev,
                                    <div>
                                    <Link to={{pathname:`/set_details/${item.id}`,state:{id:item.id}}}>
                                        <div className="sbp-matching-set-item">
                                            <div>{item.name}</div>
                                            <div>{item.set_num}</div>
                                            <div className="sbp-matching-set-img"><img src={item.set_img_url} alt={item.set_num} width="100%" /></div>
                                            {setParts}
                                        </div>
                                    </Link>
                                </div>
                                ]);
                            })
                        }
                    })
                })
            })
            
        })
    }
    
    return ( 
        <div>
            <TopBar />
            <SideBar />
            <div id="sbp-container"> 
                <h1>
                    Search By Part
                </h1>
                <div id="sbp-input-part-container">
                        <form id="sbp-input-container" onSubmit={handleSubmitSearch}>
                            Part Number
                            <input id="sbp-input" type="text" value={searchStr} onChange={(e)=>{setSearchStr(e.target.value)}} />
                            <input type="submit" id="sbp-submit-btn" value="Search"/>
                        </form>
                    <div id="sbp-part-container">
                        <div id="sbp-part-name">
                            {searchResults.detail?"No matching parts":searchResults.name}
                        </div>
                        <div>
                            {<img src={searchResults.part_img_url} alt={searchResults.name} height="150px"/>}
                        </div>
                    </div>
                </div>

                <div>
                    <div id="sbp-appears-in-text">
                        {
                            "Appears in " + matchingSets.length + " sets:"
                        }
                    </div>
                    <div id="sbp-matching-sets-container">
                        {/* {searched?sets:""} */ matchingSets}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchByPart;