export default function DeleteButton ({
  handleDelete,
  i
} : {
  handleDelete  : Function,
  i             : number
}) {
  
  
  return <>
    <button 
      onClick={() => handleDelete(i)}
    >
      X
    </button>
  </>
}