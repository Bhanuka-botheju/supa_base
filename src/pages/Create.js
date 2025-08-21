import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseclient"

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  const handleSubmit = async (e) =>{
    e.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    if(!title || !method || !rating){
      setFormError("please fill the field first")
      return
    }

    console.log(title,method,rating)

    const {data , error} = await supabase
      .from("smoothe")
      .insert([{title,method,rating}])
      .select()

      if(error){
        console.log(error)
        setFormError("please fill the field first")
      }
      if(data){
        console.log(data)
        setFormError(null)
        navigate("/")
      }


  }

  return (
    <div className="page create">
      <h2>Create a New Smoothie</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Mango Blast"
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="Describe how it's made..."
          />
        </label>

        <label>
          <span>Rating (1-5):</span>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </label>

        <button type="submit">Add Smoothie</button>

        {formError && <p className="error">{formError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  )
}

export default Create