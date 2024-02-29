"use client";

// ** MUI Imports
import { Box, Typography } from "@mui/material";

// ** Third Party Imports
import { motion } from "framer-motion";

function HomepageTitle() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
        >
            <Box className="page-title">
                <Typography variant="h4" component="h1">
                    Now playing on various platforms 🍿
                </Typography>
            </Box>
        </motion.div>
    );
}

export default HomepageTitle;
