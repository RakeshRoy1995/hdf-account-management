import { Link } from "react-router-dom"


const ResetButton = () => {
  return (
    <div>
      <div className="flex justify-end mt-5">
        <Link to="/admin">
        <button type="button" className="bg-tertiaryColor font-bold text-sm text-white rounded-lg px-4 py-3 flex justify-center items-center gap-1">
          Cancel
        </button>
        </Link>
      </div>
    </div>
  )
}

export default ResetButton