/* eslint-disable prefer-const */
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";

const PostShimmer = () => {
  const theme = useSelector((store: RootState) => store.user.darkMode);

  let bgColor: string;

  bgColor = theme ? "bg-gray-800" :  "bg-gray-200"

  return (
    <>
      <article
        className={`mb-4 lg:px-20 mt-3 break-inside p-3 rounded-lg shadow flex flex-col bg-clip-border`}
      >
        <div className="flex pb-7 p-2 h-6 items-center justify-between">
          <div className="flex">
            <div
              className={`${bgColor} inline-block mr-4 h-9 w-9 rounded-full`}
            ></div>
            <div className="flex flex-col">
              <div>
                <div
                  className={`${bgColor} inline-block text-base font-medium h-3 w-28`}
                ></div>
              </div>
              <div className={`${bgColor} text-xs  h-2 w-16`}></div>
            </div>
          </div>
          <div className={`${bgColor} mr-3 h-6 w-2`}></div>
        </div>

        <div className="px-2">
          <div className="flex justify-between gap-1 mb-1">
            <div className={`${bgColor} flex h-screen min-w-full`}></div>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostShimmer;
