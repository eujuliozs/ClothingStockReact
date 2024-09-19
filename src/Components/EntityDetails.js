import { type } from "@testing-library/user-event/dist/type";
import { useLocation, Link } from "react-router-dom";
import ApiConsumer from "../Services/ApiConsumer"
import Modal from "./Modal";
import { useState } from "react";
import  styles  from "./EntityDetails.module.css"

export default function EntityDetails()
{
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();
    const obj = location.state?.item;
    const locationtype = location.state?.type
    console.log(obj)
    console.log(type)
    return(
        <>      
            <div className={styles.container}>
                <div className={styles.entityDetailsCard}>
                    <ul>
                        <li>Id: {obj.id}</li>
                        <li>name: {obj.name}</li>
                        <li>stock: {obj.stock}</li>
                        <li>Description: {obj.description}</li>
                        <li>Size: {obj.size}</li>
                        <li>imageUrl: {obj.imageUrl}</li>
                    </ul>
                    <Link to="/new" state={{
                        Text: "editar",
                        obj: obj,
                        type: locationtype, 
                        requestMethod: "patch"
                    }}>editar</Link>
                    <button onClick={() => setIsOpen(true)}>Deletar</button>   
                    
                </div>
            </div> 
            <Modal 
                isOpen={isOpen} 
                onCancel={handleCancel} 
                onConfirm={handleDelete}
            />

        </>
            
    )
    function handleDelete(e)
    {
        ApiConsumer.DeleteRequest(obj.id, locationtype)
        setIsOpen(false)
    }

    function handleCancel()
    {
        setIsOpen(false)
    }
}