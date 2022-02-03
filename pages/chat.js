import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";

import appConfig from "../config.json";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import { ButtonSendMessage } from "../src/components/ButtonSendMessage";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkwNzQ1NiwiZXhwIjoxOTU5NDgzNDU2fQ.tluqIrJLGxe4XqDft-jXGDGFTk7KDNip39ftLyL-sQ8";
const SUPABASE_URL = "https://rjwrxwzxylnjbehptonr.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function MessageListener(adicionarMensagem) {
    return supabaseClient
        .from("Mensagens")
        .on("INSERT", (autoResponse) => {
            adicionarMensagem(autoResponse.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState("");
    const [listaMensagens, setListaMensagens] = React.useState([]);
    const [done, setDone] = React.useState(false);

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;

    React.useEffect(() => {
        supabaseClient
            .from("Mensagens")
            .select("*")
            .order("created_at", { ascending: false })
            .then(({ data }) => {
                setListaMensagens(data);
            });

        MessageListener((novaMensagem) => {
            setListaMensagens((valorAtualLista) => {
                return [novaMensagem, ...valorAtualLista];
            });
        });

        setDone(true);
    }, []);

    function handleNewMessage(novaMensagem) {
        const mensagem = {
            // id: listaMensagens.length,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from("Mensagens")
            .insert([mensagem])
            .then(({ data }) => {
                console.log("Nova mensagem: ", data);
            });

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
                    <MessageList
                        mensagens={listaMensagens}
                        setListaMensagens={setListaMensagens}
                        done={done}
                    />
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

                                    if (mensagem.length !== 0) {
                                        handleNewMessage(mensagem);
                                    }
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

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNewMessage(":sticker:" + sticker);
                            }}
                        />

                        <ButtonSendMessage
                            onClick={() => {
                                handleNewMessage(mensagem);
                            }}
                            disabled={mensagem.length === 0}
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
            {!props.done && <ReactLoading />}
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
                                    hover: {
                                        "-webkit-transform": "scale(5)",
                                        marginLeft: "50px",
                                    },
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
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
                        </Box>
                        {mensagem.texto.startsWith(":sticker:") ? (
                            <Image
                                src={mensagem.texto.replace(":sticker:", "")}
                                styleSheet={{
                                    maxWidth: "10%",
                                }}
                            />
                        ) : (
                            mensagem.texto
                        )}
                    </Text>
                );
            })}
        </Box>
    );
}
