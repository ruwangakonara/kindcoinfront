import "./Card.css"
import { Link } from "react-router-dom"

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
                <Link to={props.link} className="btn btn-primary">Go somewhere</Link>
            </div>
        </div>
    )
}