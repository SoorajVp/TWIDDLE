/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import PostSingleView from "../../modal/PostSingleView";



const PostList= ({ items } ) => {

  const singleView = () => {
    console.log("Clicked")
  }
  console.log("this is list items ------", items )
  return (
    <>
      <div className="grid grid-cols-3 gap-1 mt-5">
        {items?.map((item) => {
          return (
            <div key={item?._id} onClick={singleView} >
              <PostSingleView {...item}/>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostList;
