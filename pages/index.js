import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

function Titulo(props) {
    const Tag = props.tag || "h1";

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals["000"]};
                    font-size: 24px;
                    font-weight: 600;
                    font-family: "Press Start 2P";
                    opacity: 1;
                }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    // const username = "Ruhtra47";
    const [username, setUsername] = useState("Ruhtra47");
    const [avatarUrl, setAvatarUrl] = useState(
        "https://github.com/Ruhtra47.png"
    );
    const [name, setName] = useState("Arthur");
    const roteamento = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage:
                        "url(https://i.pinimg.com/originals/fa/dc/b2/fadcb24075acb650de29f258af69d830.gif)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                }}
            >
                <Box
                    styleSheet={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        width: "100%",
                        maxWidth: "700px",
                        borderRadius: "5px",
                        padding: "32px",
                        margin: "16px",
                        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: "100%", sm: "50%" },
                            textAlign: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <Titulo tag="h2">Press Start</Titulo>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: "32px",
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                        >
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                setUsername(event.target.value);

                                fetch(
                                    `https://api.github.com/users/${event.target.value}`,
                                    {
                                        headers: {
                                            "User-Agent": "Ruhtra47",
                                        },
                                    }
                                )
                                    .then((response) => response.json())
                                    .then((response) => {
                                        setName(response.name);
                                    });
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor:
                                        appConfig.theme.colors.neutrals[200],
                                    mainColor:
                                        appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight:
                                        appConfig.theme.colors.primary[500],
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            label="Entrar"
                            fullWidth
                            buttonColors={{
                                contrastColor:
                                    appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight:
                                    appConfig.theme.colors.primary[400],
                                mainColorStrong:
                                    appConfig.theme.colors.primary[600],
                            }}
                            disabled={username.length < 2}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                            padding: "16px",
                            backgroundColor:
                                appConfig.theme.colors.neutrals[800],
                            border: "1px solid",
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: "10px",
                            flex: 1,
                            minHeight: "240px",
                        }}
                    >
                        {username.length >= 2 && (
                            <Image
                                styleSheet={{
                                    borderRadius: "50%",
                                    marginBottom: "16px",
                                }}
                                src={`https://github.com/${username}.png`}
                            />
                        )}

                        {username.length >= 2 && (
                            <>
                                <Text
                                    variant="body4"
                                    styleSheet={{
                                        color: appConfig.theme.colors
                                            .neutrals[200],
                                        backgroundColor:
                                            appConfig.theme.colors
                                                .neutrals[900],
                                        padding: "3px 10px",
                                        borderRadius: "200px",
                                        fontSize: "15px",
                                    }}
                                >
                                    {name}
                                </Text>
                            </>
                        )}
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
