import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseclient"



const Update = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  

  useEffect(()=> {
    const fetchsmoothe = async ()=>{
      const {data,error} = supabase
        .from("smoothe")
        .select()
        .eq("id",id)  // First is comlumn name second one is a parameter
        .single()

        if(error){
          console.log(error)
          
          navigate("/",{replace:true})
        }
        if(data){
          console.log(data)
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
        }
      }

      fetchsmoothe()

  },[id,navigate])

  const handleSubmit = async(e)=> {
    e.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    const {data , error} = await supabase 
      .from("smoothe")
      .update({title,method,rating})
      .eq("id" , id)

      if(error){
        console.log(error)
        setFormError("could not update smoothie")
      }
      else{
        setSuccessMessage("Smoothie updated successfully 🎉")
        setTimeout(() => navigate("/", { replace: true }), 1500)
      }
  }

  return (
    <div className="page update">
      <h2>Update Smoothie</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </label>

        <label>
          <span>Rating:</span>
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
          />
        </label>

        <button type="submit">Update Smoothie</button>

        {formError && <p className="error">{formError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  )
}

export default Update