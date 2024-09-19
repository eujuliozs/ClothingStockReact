import  ApiConsumer  from "../Services/ApiConsumer"
import { useState, useEffect } from "react"
import Styles from "./ShowStock.module.css"
import ClothingForm from "./ClothingForm"
import { Link, BrowserRouter, Route, Routes } from "react-router-dom"
import { type } from "@testing-library/user-event/dist/type"

export default function ShowStock()
{
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
        async function fetchData() 
        {
            try{
                const data = await ApiConsumer.Get("T_Shirts")
                console.log(data)
                setData(data)
                
                const data2 = await ApiConsumer.Get("Shorts")
                console.log(data2)
                setData2(data2)
            }  
            catch(error)
            {
                setError("Não foi possivel trazer os dados", error)
                console.error("error", error)
            }
            finally
            {
                setLoading(false)
            }
            
        }

        fetchData()
    },[])

    if(loading == true) return <h2>loading...</h2>
    if(error) {
        console.error(error)
        return <h2>{error}</h2>
    }
        return(
            <>
                <div className={Styles.card_container}>
                    <h3 className={Styles.header_bar}>T shirts</h3>
                    {data.map((item) => (
                        <div key={item.Id} className={Styles.card}>
                            <div className={Styles.card_content}>
                                <p>{item.name} - {item.size}</p>
                                <Link to="/details" 
                                state={{item: item, type: "T_Shirts"}}>
                                    <button className={Styles.edit_button}>Detalhes</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={Styles.card_container}>
                    <h3 className={Styles.header_bar}>Shorts</h3>
                    {data2.map((item) => (
                        <div key={item.Id} className={Styles.card}>
                            <div className={Styles.card_content}>
                                <p>{item.name} - {item.size}</p>
                                <Link to="/details" 
                                state={{item : item, type: "Shorts"}}>
                                    <button className={Styles.edit_button}>Detalhes</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )

}