import { useState } from "react";

export function useInput(initialValues: Record<string, string>) {
  const [inputValues, setInputValues] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { inputValues, handleInputChange };
}
