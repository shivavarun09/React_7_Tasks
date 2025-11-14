import { Alert, AlertTitle, Button, Box } from "@mui/material";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">
        <AlertTitle>Something went wrong</AlertTitle>
        {error.message}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        </Box>
      </Alert>
    </Box>
  );
}
