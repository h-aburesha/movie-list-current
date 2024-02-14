import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const MovieCardSkeleton = () => {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                padding: "16px",
                margin: "16px",
            }}
        >
            {Array(4).fill(
                <div style={{ marginTop: 50 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "210px",
                        }}
                    >
                        <Skeleton
                            sx={{ bgcolor: "grey.900" }}
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton sx={{ bgcolor: "grey.900" }} />
                            <Skeleton sx={{ bgcolor: "grey.900" }} />
                        </Box>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default MovieCardSkeleton;
