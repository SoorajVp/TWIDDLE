/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const Explore = ( data) => {
    const { image } = data
  return (
    <div onClick={()=> console.log(data)}>
        <img src={image} alt="Post" className="min-w-full min-h-full cursor-pointer bg-gray-500" />
    </div>
    
  )
}

export default Explore