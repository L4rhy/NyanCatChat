import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.primary["500"]};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
    </>
  );
}
export default function PaginaInicial() {
  const [username, setUsername] = React.useState('omariosouto');
  const roteamento = useRouter();
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary["300"],
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
            backgroundColor: appConfig.theme.colors.neutrals["500"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submeteu o form');
              roteamento.push('/chat');
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Bem Vinde!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary["400"] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                console.log('usuario digitou', event.target.value);
                const valor = event.target.value;
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary["400"],
                  mainColor: appConfig.theme.colors.primary["500"],
                  mainColorHighlight: appConfig.theme.colors.neutrals["500"],
                  backgroundColor: appConfig.theme.colors.neutrals["400"],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["100"],
                mainColor: appConfig.theme.colors.neutrals["500"],
                mainColorLight: appConfig.theme.colors.primary["300"],
                mainColorStrong: appConfig.theme.colors.primary["500"],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals["300"],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['500'],
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
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary["200"],
                backgroundColor: appConfig.theme.colors.primary["500"],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

