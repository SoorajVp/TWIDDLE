
interface PostListProps {
  items: string[]; // Update the prop name to 'items'
}

const PostList= ({ items }: PostListProps) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-5">
        {items.map((item, index) => {
          return (
            <div key={index}>
              <img className="min-h-full" src={item} alt="Sample" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostList;
