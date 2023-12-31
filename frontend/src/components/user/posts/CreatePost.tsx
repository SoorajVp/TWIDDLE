import { ChangeEvent, useState } from "react";
import Cropper from "react-easy-crop";
import { dataURLtoFile } from "../../../utils/ImageCropDialog";
import Loading from "../../shimmer/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../../../api/requests/postRequest";

const CreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const navigate = useNavigate();

  const [description, setDescription] = useState<string>("");

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log(croppedAreaPercentage);
    setCroppedArea(croppedAreaPixels);
    const cropper = document.createElement("canvas");
    cropper.width = croppedAreaPixels.width;
    cropper.height = croppedAreaPixels.height;
    const ctx = cropper.getContext("2d");
    const imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = function () {
      ctx.drawImage(
        imageObj,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedImageURL = cropper.toDataURL();
      setCroppedImage(croppedImageURL);
    };
  };

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      isImageFile(e.target.files?.[0]) &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    } else {
      toast.warn("Invalid file format !", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  const handleCreatePost = async () => {
    if (croppedImage) {
      setLoading(true);
      console.log(croppedArea);
      const result = dataURLtoFile(croppedImage, "image");
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", result);
      const response = await postRequest.CreatePost(formData);
      if (response.status == "success") {
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
        });
        navigate("/");
      } else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex my-2 justify-between">
        <div className="font-medium text-lg pt-4 pl-1">New Post</div>
        <button
          className="p-1 px-5 text-xs font-bold hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-700 mt-3 rounded transition duration-300 ease-in"
          onClick={handleCreatePost}
        >
          CREATE
        </button>
      </div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or JPEG</p>
          </div>
          {/* } */}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={onSelectFile}
          />
        </label>
      </div>
      <div className={`${!image && "hidden"}  h-72 relative rounded-md my-1`}>
        {image && (
          <div className="rounded-md">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
      </div>

      <label
        htmlFor="description"
        className="block my-1 text-sm font-medium text-gray-800 text-center"
      >
        Description
      </label>
      <textarea
        id="message"
        rows={4}
        onChange={(e) => setDescription(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
};

export default CreatePost;
