import { useState, useEffect } from "react";
import axios from "axios";

const useRandomImage = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/random-image`
        );
        setBackgroundImageUrl(
          `${process.env.REACT_APP_SERVER_URL}${response.data.url}`
        );
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };

    fetchRandomImage();
  }, []);

  return backgroundImageUrl;
};

export default useRandomImage;
