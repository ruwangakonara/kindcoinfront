import { Link } from "react-router-dom"
import classes from "./Card.module.css"

const Card = (props) => {
    return (
        <div className={classes.card}>
            <div className={classes.cardBody}>
                <h5 className={classes.cardTitle}>{props.title}</h5>
                <p className={classes.cardText}>{props.text}</p>
                <Link to={props.link} className="btn btn-primary">Go somewhere</Link>
            </div>
        </div>
    )
}

export default Card