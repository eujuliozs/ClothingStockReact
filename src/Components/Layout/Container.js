import Styles from "./Container.module.css"

export default function Container(props){
    return(
        <div className={Styles.Container}>{props.children}</div>
    )
}