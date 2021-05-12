import React, {  useState } from 'react';

import TopBar from './TopBar';
import SideBar from './SideBar';

import { updateAddNewSet } from '../utils/mysql/update';
import { readRbSetSearch } from '../utils/mysql/read';
import { PulseLoader } from 'react-spinners';

const AddNewSet = props => {
    const [searchStr, setSearchStr] = useState('');
    const [details,setDetails] = useState("");
    const [searching, setSearching] = useState(false);
    const [addedClass, setAddedClass] = useState(false);
    
    //initial search for set based on set num
    const handleSetSearch = (e) =>{
        e.preventDefault();
        setSearching(true);
        readRbSetSearch(searchStr)
        .then(res=>{
            setSearching(false);
            setDetails(res.data);
        })
    }

    //add set to database
    const handleAddToCollection = (item) => {
        setAddedClass(true);
        updateAddNewSet(item).then((res)=>{
            props.history.push({
                pathname:`/set_details/${res.response}`,
                state:{id:res.response}
            });
        })
    }

    let numResults;
    let searchResults;

    if(Array.isArray(details)){
        if(details.length===0){
            numResults = "";
            searchResults = <h2>No results matching search</h2>
        }else if(details.length===100){
            numResults = "";
            searchResults = <h3>Too many results. Try a different search.</h3>
        }else{
            numResults = details.length>0?details.length + " results":"";
            searchResults = details.map(item=>{
                return (
                    <div className="ans-result-item-container" key={item.set_num}>
                        <div className="ans-result-item-name">{item.name}</div>
                        <div className="ans-result-item-num">{item.set_num}</div>
                        <div className="ans-result-item-img-container">
                            <img src={item.set_img_url} alt={item.name} className="ans-result-item-img" />
                        </div>
                        <button disabled={addedClass} className="ans-add-btn" onClick={()=>{handleAddToCollection(item)}}>Add To Collection</button>
                    </div>
    
                )
            })
        }
    }
    

    return (
        <div id="container">
            <TopBar />
            <SideBar />
            <div id="ans-container">
                <h1>Add New Set</h1>
                <form id="ans-search-form" onSubmit={e=>{handleSetSearch(e)}}>
                    Search:
                    <input type="text" id="ans-search-input" value={searchStr} onChange={(e)=>{setSearchStr(e.target.value)}}/>
                    <input type="submit" id="ans-search-btn"/>
                </form>
                <div id="ans-num-results">
                    {numResults}
                </div>
                <div id="ans-results-container">
                    {searching?<div id="ans-spinner"><PulseLoader color={"lightblue"} size={30}/></div>:searchResults}
                </div>
            </div>
        </div>
    )

}

export default AddNewSet;