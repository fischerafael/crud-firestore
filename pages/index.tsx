import React, { useEffect } from "react";

const index = () => {
  return <Test />;
};

export default index;

export const Test = () => {
  useEffect(() => {
    fetch("", {
      method: "GET",
      headers: {
        app: "",
        user: "",
        api_key: "",
        action: "LIST",
      },
    });
    console.log("hello");
  }, []);

  return <div>Test</div>;
};
