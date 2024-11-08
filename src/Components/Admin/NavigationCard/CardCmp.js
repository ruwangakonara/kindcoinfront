import { Link } from "react-router-dom"
import classes from "./CardCmp.module.css"
import {Icon, Image} from 'semantic-ui-react';

const CardCmp = (props) => {

    return (
        <Link to={props.link}>
            <div className={classes.card}>
                <div className={classes.cardBody}>
                    <h2 className={classes.cardTitle}>{props.title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default CardCmp