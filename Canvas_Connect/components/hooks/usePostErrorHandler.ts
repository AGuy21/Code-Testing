import { useState } from "react";

export interface ErrorMessages {
  title: string;
  picture: string;
  description: string;
  other: string;
}

export const usePostErrorHandler = () => {
  const [errors, setErrors] = useState<ErrorMessages>({
    title: "",
    picture: "",
    description: "",
    other: "",
  });

  const clearErrors = () => {
    setErrors({
      title: "",
      picture: "",
      description: "",
      other: "",
    });
  };

  const setErrorFromMessage = (errorMessage: string) => {
    const newErrors: ErrorMessages = {
      title: "",
      picture: "",
      description: "",
      other: "",
    };

    if (errorMessage.includes("Title")) {
      newErrors.title = errorMessage;
    } else if (errorMessage.includes("Picture")) {
      newErrors.picture = errorMessage;
    } else if (errorMessage.includes("Description")) {
      newErrors.description = errorMessage;
    } else {
      newErrors.other = errorMessage;
    }

    setErrors(newErrors);
  };

  return { errors, setErrorFromMessage, clearErrors };
};
