import supabase from "../config/supabaseclient"
import SmoothiesCard from "../components/SmoothiesCard";
import { useEffect, useState, } from "react"

const Home = () => {
  const [fetcherror,setfetcherror] = useState(null);
  const [smoothies,setsmoothies] = useState(null);
  const [orderby,setorderby] = useState("created_at")

  const onDelete =(id)=>{
    setsmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }


  useEffect(()=>{
    const fetchSmoothies = async ()=>{
      const {data,error} = await supabase
        .from("smoothe")
        .select()
        .order(orderby,{ascending:false})
    
        if(error){
          setfetcherror("could not fetch smoothies")
          setsmoothies(null)
          console.log(error)
        }
        if(data){
          setsmoothies(data)
          console.log(data)
          setfetcherror(null)
        }
    }

    fetchSmoothies()


  },[orderby])  // this orderby state is change this useEffect run again


  return (
    <div className="page home">
      {
        fetcherror && (<p>{fetcherror}</p>)
      }
      {
        smoothies && (
          <div className="smoothies">
            <div className="order-by">
              <button onClick={()=>setorderby("created_at")}>Time Created</button>
              <button onClick={()=>setorderby("title")}>Title</button>
              <button onClick={()=>setorderby("rating")}>Rating</button>
              <p>Order by: {orderby}</p>
            </div>
            {smoothies.map(smoothie => (
              <SmoothiesCard key={smoothie.id} smoothe={smoothie} onDelete = {onDelete}/>  // function pass as a prop
            ))}
          </div>

        )
      }
    </div>
  )
}

export default Home