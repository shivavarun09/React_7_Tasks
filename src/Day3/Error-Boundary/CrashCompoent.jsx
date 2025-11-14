import { useState } from "react";
import { Button } from "@mui/material";

export default function CrashComponent() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("App crashed intentionally to demonstrate react-error-boundary! By crating a CrashCompoent and throwing a new error when user clicks Throw an error. Click tryagain button to resetErrorBoundary");
  }

  return (
    <>
    <Button variant="contained" color="error" onClick={() => setCrash(true)}>
      Throw an Error
    </Button>
    </>
  );
}
