import supabase from "../config/supabaseclient"
import SmoothiesCard from "../components/SmoothiesCard";
import { useEffect, useState, } from "react"

const Home = () => {
  const [fetcherror,setfetcherror] = useState(null);
  const [smoothies,setsmoothies] = useState(null);

  useEffect(()=>{
    const fetchSmoothies = async ()=>{
      const {data,error} = await supabase
        .from("smoothe")
        .select()
    
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


  },[])


  return (
    <div className="page home">
      {
        fetcherror && (<p>{fetcherror}</p>)
      }
      {
        smoothies && (
          <div className="smoothies">
            {smoothies.map(smoothie => (
              <SmoothiesCard key={smoothie.id} smoothe={smoothie}/>
            ))}
          </div>

        )
      }
    </div>
  )
}

export default Home