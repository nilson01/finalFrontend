import React, { useEffect } from "react";
import { Box } from "@material-ui/core";

function PageNotFound() {
  useEffect(() => {
    document.title = `404`;
  }, []);
  return (
    <>

      <Box
        display="flex"
        style={{
          height: "90vh",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src="https://res.cloudinary.com/nilson01/image/upload/v1622441807/jhoileuxkrv0eyaaoqqx.png"
            alt="Page not found"
          />
        </div>
      </Box>
    </>
  );
}

export default PageNotFound;
