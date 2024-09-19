import style from "./ClothingForm.module.css"
import { useState, useEffect } from "react"
import ApiConsumer from "../Services/ApiConsumer"
import { Navigate, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function ClothingForm(){
    const Navigate = useNavigate();
    const location = useLocation();
    const obj = location.state?.obj;
    const text = location.state?.text;
    const locationType = location.state?.type;

    console.log("Recebendo type no form", locationType)
    const [formInfo, setFormInfo] = useState(
        {
            id:"",
            name:"",
            stock:"",
            color:"",
            description:"",
            size:"",
            imageUrl:""
        }
    )

    const [type, setType] = useState(locationType)

    useEffect(() => {
        if (obj) {
          setFormInfo({
            id: obj.id || "",
            name: obj.name || "",
            stock: obj.stock || "",
            color: obj.color || "",
            description: obj.description || "",
            size: obj.size || "",
            imageUrl: obj.imageUrl || "",
          });
        }
      }, [obj]);

    return(

        <div className={style.container}>
            <form className={style.clothingForm}>
            <h2>{text}</h2>
                <div>
                    <label>Prouct Name</label>
                    <input 
                        name="name" 
                        type="text"
                        placeholder={formInfo.name}
                        onChange={HandleInputChange}
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input 

                        name="stock"
                        placeholder={formInfo.stock}
                        type="text"
                        onChange={HandleInputChange}
                    />
                </div>
                <div>
                    <label>Color</label>
                    <input 
                        name="color"
                        placeholder={formInfo.color}
                        type="text"
                        onChange={HandleInputChange}
                        />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        name="description"
                        placeholder={formInfo.description}
                        type="text"
                        onChange={HandleInputChange}
                        />
                </div>
                <div>
                    <label>Size</label>
                    <input 
                        name="size"
                        placeholder={formInfo.size}
                        type="text"
                        onChange={HandleInputChange}
                        />
                </div>
                <div>
                    <label>Image Url</label>
                    <input 
                        name="imageUrl"
                        placeholder={formInfo.imageUrl}
                        type="text"
                        onChange={HandleInputChange}
                        />
                </div>
                <div>
                    <label>Clothing Type</label>
                        <select
                            name="clothingType"
                            onChange={(e) => {setType(e.target.value)
                                
                            }}>
                                <option value="T_shirts">T Shirt</option>
                                <option value="Shorts">Shorts</option>
                        </select>
                </div>
                <div>
                    <button className={style.submitButton} type="submit" onClick={GetFormInfo}>Submit</button>
                </div>

            </form>
            {console.log("valor do useState type", type)}
        </div>
    )
    

    function HandleInputChange(e)
    {
        const{name, value} = e.target;
        setFormInfo((prevState) => ({
            ...prevState,
            [name]: value,
          }));
    }   

    function GetFormInfo(e)
    {
        var requestMethod = location.state?.requestMethod
        e.preventDefault();
        if(requestMethod === "post")
        {
            ApiConsumer.PostRequest(formInfo, type)
            Navigate("/show")
        }

        else if(requestMethod === "patch")
        {
            ApiConsumer.PatchRequest(formInfo, type)
            Navigate("/show")
        } 
        
    }
}