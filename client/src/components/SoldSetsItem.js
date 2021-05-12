import React from 'react';
import {Link} from 'react-router-dom';
import dateformat from 'dateformat';

const SoldSetsItem = (props) =>{
    let soldDate = new Date(props.data.sold_date)
    soldDate = dateformat(soldDate,"dd/mm/yy");

    return (
        <div>
            <Link  className="ssi-container" to={"/set_details/" + props.data.id}>
                <div className="ssi-img-container">
                    <img src={props.data.set_img_url} alt={props.data.name} className="ssi-img" />
                </div>
                <div className="ssi-details-container">            
                    <div className="ssi-top-row">
                        <div className="ssi-num">
                            {props.data.set_num}
                        </div>
                        {props.data.archived?<div className="ssi-archived">
                            ARCHIVED
                        </div>:""}
                        <div className="ssi-date-price">
                            <div className="ssi-date-price-label">Date</div>
                            <div className="ssi-date-price-content">{soldDate}</div>
                        </div>
                        <div className="ssi-date-price">
                            <div className="ssi-date-price-label">Price</div>
                            <div className="ssi-date-price-content">£{props.data.sold_price}</div>
                        </div>

                    </div>
                    <div className="ssi-bottom-row">
                        <div className="ssi-name">{props.data.name}</div>
                    </div>
                    <div className="ssi-num-mob">
                                {props.data.set_num}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SoldSetsItem;