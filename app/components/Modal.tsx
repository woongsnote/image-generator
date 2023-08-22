import Link from "next/link";
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
      <div className="w-2/5">
        <div className="bg-white p-2 flex flex-col">
          <input
            type="text"
            className="border-2 border-blue-500 w-full p-1 placeholder:italic placeholder:text-slate-400 block bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
            placeholder="Image Url을 입력하세요!"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <Link href="https://unsplash.com/wallpapers" className="mt-4 text-sm">Unsplash 바로가기</Link>



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
