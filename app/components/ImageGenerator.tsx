"use client";

import { CSSProperties, useState, useRef } from "react";
import {
  generateRandomGradientStyle,
  generateRandomSolidStyle,
  getRandomColor,
  getRandomDirection,
} from "../utils/color";
import Modal from "./Modal";
import { toPng } from "html-to-image";
import saveAs from "file-saver";
import { formattedDate } from "../utils/date";
import { useInput } from "../hooks/useInput";
import ImagePreview from "./ImagePreview";
import RowTitle from "./RowTitle";

export default function ImageGenerator() {
  const { inputValues, handleInputChange } = useInput({
    title: "",
    subTitle: "",
    tag: "",
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({
    padding: "8px",
    border: "1px solid black",
    margin: "0",
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const divImageRef = useRef<HTMLDivElement>(null);

  const htmlToImageConvert = () => {
    const imageRef = divImageRef.current;
    if (!imageRef) return;
    toPng(imageRef, { cacheBust: false })
      .then((dataUrl) => {
        saveAs(dataUrl, `thumbnail-${formattedDate}.png`)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const generateRandomColorBackground = () => {
    const randomColor = getRandomColor();
    setBackgroundStyle({
      ...backgroundStyle,
      background: generateRandomSolidStyle(randomColor),
      border: "none",
    });
  };

  const generateRandomGradientBackground = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const direction = getRandomDirection();
    const gradientStyle = generateRandomGradientStyle(
      color1,
      color2,
      direction
    );
    setBackgroundStyle({
      ...backgroundStyle,
      background: gradientStyle,
      border: "none",
    });
  };

  const generateImageBackground = () => {

    setBackgroundStyle({
      ...backgroundStyle,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      border: "none",
    });

    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const textToWhite = () => {
    setBackgroundStyle({ ...backgroundStyle, color: "white" });
  };

  const textToBlack = () => {
    setBackgroundStyle({ ...backgroundStyle, color: "black" });
  };

  const textToShadow = () => {
    setBackgroundStyle({
      ...backgroundStyle,
      textShadow: backgroundStyle.textShadow
        ? ""
        : `rgba(0, 0, 0, 0.4) 2px 2px 4px`,
    });
  };

  const rowStyle = `flex flex-col md:flex-row gap-4 mx-auto justify-between w-full items-center border-y py-4`;
  const inputStyle = `border-2 border-blue-500 w-full md:w-1/3 rounded-md p-1 placeholder:italic placeholder:text-slate-400 block bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm`;
  const buttonStyle = `bg-blue-500 rounded-md p-1 text-white w-4/5 mx-auto md:w-1/3 shadow-lg`;

  return (
    <>
      <div className="flex flex-col mx-auto max-w-3xl">
        <div className={`${rowStyle}`}>
          <RowTitle title="내용 입력" />
          <input
            id="title"
            type="text"
            name="title"
            value={inputValues.title}
            required
            placeholder="제목을 입력하세요."
            className={inputStyle}
            onChange={handleInputChange}
          />
          <input
            id="subTitle"
            type="text"
            name="subTitle"
            value={inputValues.subTitle}
            required
            className={inputStyle}
            placeholder="부제목을 입력하세요."
            onChange={handleInputChange}
          />
          <input
            id="tag"
            type="text"
            name="tag"
            value={inputValues.tag}
            required
            className={inputStyle}
            placeholder="태그를 입력하세요."
            onChange={handleInputChange}
          />
        </div>
        <div className={rowStyle}>
          <RowTitle title="배경 설정" />
          <button
            type="button"
            className={buttonStyle}
            onClick={generateRandomGradientBackground}
          >
            그라데이션
          </button>
          <button
            type="button"
            className={buttonStyle}
            onClick={generateRandomColorBackground}
          >
            단색
          </button>
          <button
            id="image"
            type="button"
            className={buttonStyle}
            onClick={openModal}
          >
            이미지 URL
          </button>
        </div>
        <div className={`${rowStyle} mb-4`}>
          <RowTitle title="텍스트 설정" />
          <button type="button" className={buttonStyle} onClick={textToShadow}>
            그림자
          </button>
          <button type="button" className={buttonStyle} onClick={textToWhite}>
            흰색
          </button>
          <button type="button" className={buttonStyle} onClick={textToBlack}>
            검은색
          </button>
        </div>
        <ImagePreview
          title={inputValues.title}
          subTitle={inputValues.subTitle}
          tag={inputValues.tag}
          backgroundStyle={backgroundStyle}
          ref={divImageRef}
        />

        <button
          className={`${buttonStyle} p-4 mt-5`}
          onClick={htmlToImageConvert}
        >
          저장하기
        </button>
      </div>

      <Modal
        isVisible={showModal}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onClose={closeModal}
        setBackgroundImage={generateImageBackground}
      />
    </>
  );
}
