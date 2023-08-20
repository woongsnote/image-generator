import { Dispatch, SetStateAction } from "react";

export default function Modal({
  isVisible,
  imageUrl,
  setImageUrl,
  onClose,
  setBackgroundImage,
}: {
  isVisible: boolean;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  setBackgroundImage: () => void;
}) {
  if (!isVisible) return null;

  const buttonStyle = `border rounded-lg p-2`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px]">
        <div className="bg-white p-2 flex flex-col">
          <input
            type="text"
            className="pl-2"
            placeholder="Image Url을 입력하세요!"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="flex flex-row justify-center gap-12 items-center mt-2">
            <button
              className={`${buttonStyle} text-blue-500`}
              onClick={() => onClose()}
            >
              취소
            </button>
            <button
              className={`${buttonStyle} bg-blue-500 text-white`}
              onClick={() => setBackgroundImage()}
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
