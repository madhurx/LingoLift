import { CircularProgress, Container } from "@mui/material"

const Loader = () => {
  return (
    <Container maxWidth={"sm"} className="px-10 mt-28 justify-center text-center text-7xl">
        <CircularProgress/>
    </Container>
  )
}

export default Loader