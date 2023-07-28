/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// interface PostListProps {
//   items: string[]; // Update the prop name to 'items'
// }

const PostList= ({ items }) => {

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-5">
        {items?.map((item, index) => {
          return (
            <div key={index}>
              <img className="min-h-full bg-gray-300" src={item.image} alt="Sample" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostList;
