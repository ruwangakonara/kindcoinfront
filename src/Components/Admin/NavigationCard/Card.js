import { Link } from "react-router-dom"
import classes from "./Card.module.css"
import {Image} from 'semantic-ui-react';

const Card = (props) => {

    return (
        <Link to={props.link}>
            <div className={classes.card}>
                <div className={classes.cardBody}>
                    <h2 className={classes.cardTitle}>{props.title}</h2>
                    <Image src={'https://via.placeholder.com/150'} circular/>
                </div>
            </div>
        </Link>
    )
}

export default Card