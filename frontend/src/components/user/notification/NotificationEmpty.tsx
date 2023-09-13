import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";

const NotificationEmpty = () => {

    const { darkMode } = useSelector((store: RootState) => store.user);

  return (
      <div className="flex justify-center w-full mt-16">
          <div className="text-center">
              <div className="flex justify-center">
                  <img className="w-[40%] -m-8" src="notification-image.png"
                      alt="Loading"
                  />
              </div>
              <br />
              <h2 className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-lg`}>You have no new Notifications</h2>
          </div>
      </div>
  )
}

export default NotificationEmpty