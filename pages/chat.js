import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState("");
    const [listaMensagens, setListaMensagens] = React.useState([]);

    function handleNewMessage(novaMensagem) {
        const mensagem = {
            id: listaMensagens.length,
            de: "ruhtra47",
            texto: novaMensagem,
        };

        setListaMensagens([mensagem, ...listaMensagens]);
        setMensagem("");
    }

    return (
        <Box
            styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.pinimg.com/originals/fa/dc/b2/fadcb24075acb650de29f258af69d830.gif)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                color: appConfig.theme.colors.neutrals["000"],
            }}
        >
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                    borderRadius: "5px",
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: "100%",
                    maxWidth: "95%",
                    maxHeight: "95vh",
                    padding: "32px",
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: "relative",
                        display: "flex",
                        flex: 1,
                        height: "80%",
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: "column",
                        borderRadius: "5px",
                        padding: "16px",
                    }}
                >
                    <MessageList mensagens={listaMensagens} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                setMensagem(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();

                                    handleNewMessage(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: "100%",
                                border: "0",
                                resize: "none",
                                borderRadius: "5px",
                                padding: "6px 8px",
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: "12px",
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            styleSheet={{
                                height: "44px",
                                width: "5%",
                                border: "0",
                                resize: "none",
                                borderRadius: "5px",
                                padding: "6px 8px",
                                marginBottom: "5px",
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: "12px",
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            variant="primary"
                            colorVariant="neutral"
                            label="Send"
                            onClick={() => {
                                handleNewMessage(mensagem);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    );
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: "5px",
                            padding: "6px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[700],
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: "8px",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                }}
                                src={`https://github.com/ruhtra47.png`}
                            />
                            <Text tag="strong">{mensagem.de}</Text>
                            <Text
                                styleSheet={{
                                    fontSize: "10px",
                                    marginLeft: "8px",
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {new Date().toLocaleDateString()}
                            </Text>
                            <Image />
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    );
}
