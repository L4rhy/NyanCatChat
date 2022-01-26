import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function AreaFoto(props){
  console.log(props)  
  return(
      <Box
    styleSheet={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '200px',
      padding: '16px',
      backgroundColor: appConfig.theme.colors.neutrals["800"],
      border: '1px solid',
      borderColor: appConfig.theme.colors.neutrals['999'],
      borderRadius: '10px',
      flex: 1,
      minHeight: '240px',
    }}
    >
    <Image
      styleSheet={{
        borderRadius: '50%',
        marginBottom: '16px',
      }}
      src={`https://github.com/${username}.png`}
    />
    <Text
      class="nome"
      variant="body4"
      styleSheet={{
        color: appConfig.theme.colors.neutrals["200"],
        backgroundColor: appConfig.theme.colors.neutrals["900"],
        padding: '3px 10px',
        borderRadius: '1000px'
      }}
      >
      {username}
    </Text>
    </Box>
  )
}
function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
              ${Tag} {
                color: ${appConfig.theme.colors.neutrals["000"]};
                font-size: 24px;
                font-weight: 600;
              }
              `}</style>
    </>
  );
}
export default function PaginaInicial() {
  const [username, setUsername] = React.useState("L4rhy");
  //const [some,setSome] = React.useState("0");
  const roteamento = useRouter();
  
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary["100"],
          backgroundImage: 'url(http://24.media.tumblr.com/99211b1795f3685b0ab692926e778fa9/tumblr_mki6dchp871s35i1to1_500.gif)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals["700"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault()
              console.log('Alguém submeteu o form')
              roteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Bem Vinde!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals["300"] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                console.log('usuario digitou', event.target.value)
                const valor = event.target.value
                setUsername(valor)
                  /*if(valor.length>2){
                    setSome("1")
                  }else{
                    setSome("0")
                  }*/
                console.log(some);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals["200"],
                  mainColor: appConfig.theme.colors.neutrals["900"],
                  mainColorHighlight: appConfig.theme.colors.primary["500"],
                  backgroundColor: appConfig.theme.colors.neutrals["800"],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary["500"],
                mainColorLight: appConfig.theme.colors.primary["400"],
                mainColorStrong: appConfig.theme.colors.primary["600"],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <AreaFoto></AreaFoto>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

