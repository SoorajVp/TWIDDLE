import { PostInterface } from "../../../state/interface/postInterface"

const Explore = ( post: PostInterface) => {
    const { image } = post;

  return (
    <div onClick={()=> console.log(post)}>
        <img src={image} alt="Post" className="min-w-full min-h-full cursor-pointer bg-gray-500" />
    </div>
    
  )
}

export default Explore