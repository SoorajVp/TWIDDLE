import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";

const ChatList = () => {
  const theme = useSelector((store: RootState) => store.user.darkMode);
  let color: string, bgColor: string, border: string;
  if (theme) {
    (color = "text-white"),
      (bgColor = "bg-gray-950"),
      (border = "border-gray-500");
  } else {
    (color = "text-gray-950"),
      (bgColor = "bg-white"),
      (border = "border-gray-500");
  }

  return (
    <div
      className={`${bgColor} ${color} ${border}  hidden col-span-2 md:block sticky h-screen border-l`}
    >
      <div className="max-w-sm mx-5 mt-6 border rounded-lg">
        
        <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-100">
          <div className="flex items-center">
            <img
              className="rounded-full h-9 w-9"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                Jane doe
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-100">
          <div className="flex items-center">
            <img
              className="rounded-full h-9 w-9"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                Jane doe
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-100">
          <div className="flex items-center">
            <img
              className="rounded-full h-9 w-9"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                Jane doe
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-100">
          <div className="flex items-center">
            <img
              className="rounded-full h-9 w-9"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                Jane doe
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-100">
          <div className="flex items-center">
            <img
              className="rounded-full h-9 w-9"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                Jane doe
              </div>
            </div>
          </div>
        </div>


       
        {/* <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200">
          <div className="flex items-center">
            <img
              className="rounded-full  h-9 w-9"
              src="https://loremflickr.com/g/600/600/paris"
            />
            <div className="ml-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold">
                Paris
              </div>
              <div className="leading-snug text-xs text-gray-600">@paris</div>
            </div>
          </div>
          <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
            Follow
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default ChatList;
