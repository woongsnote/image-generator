import { ForwardedRef, forwardRef } from "react";

interface ImagePreviewProps {
  title: string;
  subTitle: string;
  tag: string;
  backgroundStyle: React.CSSProperties;
}

function ImagePreview(
  { title, subTitle, tag, backgroundStyle }: ImagePreviewProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className="w-full max-w-3xl h-96 mx-auto flex flex-col justify-between text-center"
      style={backgroundStyle}
      ref={ref}
    >
      <div className="h-3/4 justify-center flex flex-col ">
        <h1 className="text-4xl mb-2">{title || "제목을 입력하세요"}</h1>
        <h2 className="text-2xl w-fit mx-auto mt-1">
          {subTitle || "부제목을 입력하세요"}
        </h2>
      </div>
      <p className="w-full h-auto mb-2">{tag || "태그를 입력하세요"}</p>
    </div>
  );
}

export default forwardRef<HTMLDivElement, ImagePreviewProps>(ImagePreview);
