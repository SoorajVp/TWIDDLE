/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import RightBar from "../layout/rightBar/Rightbar";
import { useEffect, useRef } from "react";
import { ZIM } from "zego-zim-web"


const VideoCall = () => {
    const { user } = useSelector((store: RootState) => store.user)
    const { roomId } = useParams();
    const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null)


    useEffect(() => {
        const appID = 1123183254;
        const serverSecret = "17d4269f2ff9f62fc4715c910b7a7135";
        const userID = user.name;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), userID);

        zeroCloudInstance.current = ZegoUIKitPrebuilt.create(kitToken);
        zeroCloudInstance.current.addPlugins({ ZIM })

        // send call invitation
        zeroCloudInstance.current
            .sendCallInvitation({
                callees: [{ userID: roomId, userName: "user_" + roomId }],
                callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
                timeout: 60,
            })
            .then((res) => {
                console.warn(res);
                if (res.errorInvitees.length) {
                    alert("The user dose not exist or is offline.");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    // const myMeeting = (element) => {


    // const zc = ZegoUIKitPrebuilt.create(kitToken);

    // zc.joinRoom({
    //     container: element,
    //     sharedLinks: [
    //         {
    //             name: 'Personal link',
    //             url: `http://localhost:5173/room/${roomId}`
    //         },
    //     ],
    //     scenario: {
    //         mode: ZegoUIKitPrebuilt.OneONoneCall
    //     },
    // showScreenSharingButton: true,
    //     showTurnOffRemoteCameraButton: false,
    //     showTurnOffRemoteMicrophoneButton: false,
    //     showRemoveUserButton: false
    // })



    // }


    return (
        <>
            <div className="lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-4 overflow-auto flex justify-center">
                {/* <div ref={myMeeting} style={{ width: "90vh" }} /> */}
            </div>

            <RightBar />
        </>
    )
}

export default VideoCall