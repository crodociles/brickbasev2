import React from 'react';
import {Link} from 'react-router-dom';

const SearchByPartItem = (props) =>{
    return (
        <div>
            <Link to={{pathname:`/set_details/${props.item.id}`,state:{id:props.item.id}}}>
                <div className="sbp-matching-set-item">
                    <div>{props.item.name}</div>
                    <div>{props.item.set_num}</div>
                    <div><img src={props.item.set_img_url} alt={props.item.set_num} width="100%" /></div>
                    {props.item.setParts.map(item=>{
                        return <div>{item.nums[1]}/{item.nums[0]} in {item.color}</div>
                    })}
                </div>
            </Link>
        </div>
    )
};

export default SearchByPartItem;