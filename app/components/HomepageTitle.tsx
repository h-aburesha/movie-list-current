// ** MUI Imports
import { Box, Typography } from "@mui/material";

function HomepageTitle() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                marginTop: "2rem",
                padding: "0.8rem",
                position: "relative",
            }}
        >
            <Typography variant="h4" component="h1">
                Now Playing in Cinemas ...
            </Typography>
        </Box>
    );
}

export default HomepageTitle;
