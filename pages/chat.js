import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from "../src/componentes/ButtonSendSticker"

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyODc3OSwiZXhwIjoxOTU4OTA0Nzc5fQ.5af-4seAQeEpbGQ1kVGmlxjCcsnU-KVkL3cVNOFCLUc';
const SUPABASE_URL = 'https://eyjzbofflrbmcrsjtdfr.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagens(adicionaMensagem){
    return supabaseClient
            .from("mensagens")
            .on("INSERT", ({respostaLive }) => {
                adicionaMensagem(respostaLive.new)
            })
            .subscribe()
}

export default function ChatPage() {
    const roteamento = useRouter();
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const usuarioLogado = roteamento.query.username

    React.useEffect(() => {
    supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data }) => {
          console.log('Dados da consulta:', data);
          setListaDeMensagens(data);
        });

    escutaMensagens((novaMensagem) => {
        setListaDeMensagens((valorAtualDalista) => {
            return [
                novaMensagem,
                ...valorAtualDalista,
              ]
        });
    })
    }, [])

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
          de: usuarioLogado,
          texto: novaMensagem,
        };
    
        supabaseClient
        .from('mensagens')
        .insert([
            mensagem
        ])
        .then(({ data }) => {
            console.log('Criando mensagem: ', data);

        });
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(http://24.media.tumblr.com/99211b1795f3685b0ab692926e778fa9/tumblr_mki6dchp871s35i1to1_500.gif)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                    >
                    <MessageList mensagens={listaDeMensagens} setListaDeMensagem={setListaDeMensagens} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter'){
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) =>{
                                handleNovaMensagem(":sticker:"+sticker)
                            }}
                        />
                        <Button 
                        onClick={() =>{
                            handleNovaMensagem(mensagem)
                        }
                        }
                        iconName="arrowRight"
                        styleSheet={{
                            borderRadius: '50%',
                            padding: '0 3px 0 0',
                            minWidth: '50px',
                            minHeight: '50px',
                            fontSize: '20px',
                            marginBottom: '8px',
                            lineHeight: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}  
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary["500"],
                            mainColorLight: appConfig.theme.colors.primary["400"],
                            mainColorStrong: appConfig.theme.colors.primary["600"],
                        }}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    />
            </Box>
        </>
    )
}

function MessageList(props) {
    function HandleDeletaMensagem(mensagem){
        const novaLista = props.mensagens.filter((mensagemFiltrada) => { 
            mensagemFiltrada.id !== mensagem
        });
        supabaseClient
            .from("mensagens")
            .delete()
            .match({id : mensagem})
            .then(()=>{
                props.setListaDeMensagem(novaLista)
            })
    }
    return (
        <Box
        tag="ul"
        styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            <Button
                                label="X"
                                variant='tertiary'
                                marginLeft="98%"
                                onClick={ ()=>{
                                    HandleDeletaMensagem(mensagem.id)
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary["500"],
                                    mainColorLight: appConfig.theme.colors.primary["400"],
                                    mainColorStrong: appConfig.theme.colors.primary["600"],
                                }}
                            /> 
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(":sticker:")
                            ? (
                                <Image 
                                src={mensagem.texto.replace(":sticker:", "")}
                                />
                            )
                            : (
                                mensagem.texto
                            )
                        }
                    </Text>
                );
            })}
        </Box>
    )
}