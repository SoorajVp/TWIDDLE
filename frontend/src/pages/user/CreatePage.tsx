import RightBar from "../../components/user/layout/Rightbar"
// import SideBar from "../../components/user/layout/Sidebar"
import CreatePost from "../../components/user/posts/CreatePost"

const CreatePage = () => {
  return (
    <>
    <div className="lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-4 overflow-auto ">
        <CreatePost />
    </div>
    <RightBar />
    </>
  )
}

export default CreatePage