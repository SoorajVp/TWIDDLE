
const Loading = () => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-50">
        <div className="flex justify-center items-center h-full">
          <img
            className="h-16 w-16 fixed "
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
            alt="Loading"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
