import { Box, CircularProgress } from "@material-ui/core";

// type LoadingProgressProps = {
//   isLoading: boolean
// }

// const LoadingProgress: React.FC<LoadingProgressProps> = (props) =>
const LoadingProgress = (props) =>
  props.isLoading ?
    <Box display="flex" justifyContent="center" alignItems="center" marginTop="2em" >
      <CircularProgress />
    </Box>
    : <>{props.children}</>

export default LoadingProgress;