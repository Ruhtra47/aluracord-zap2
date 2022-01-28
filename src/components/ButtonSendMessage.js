import React from "react";
import { Box, Button } from "@skynexui/components";

import appConfig from "../../config.json";

export function ButtonSendMessage(props) {
    return (
        <Box
            styleSheet={{
                position: "relative",
            }}
        >
            <Button
                styleSheet={{
                    borderRadius: "25%",
                    padding: "0 3px 0 0",
                    minWidth: "50px",
                    minHeight: "50px",
                    fontSize: "20px",
                    marginBottom: "8px",
                    lineHeight: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                    hover: {
                        filter: "grayscale(0)",
                    },
                }}
                variant="primary"
                colorVariant="neutral"
                label="Send"
                onClick={props.onClick}
                disabled={props.disabled}
            />
        </Box>
    );
}
