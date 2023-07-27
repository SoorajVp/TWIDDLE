/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const Explore = ( data) => {
    const { image }: any = data
  return (
    <div onClick={()=> console.log(data)}>
        <img src={image} alt="Post" className="max-w-full cursor-pointer bg-gray-500" />
    </div>
    
  )
}

export default Explore