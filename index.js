/*
* host on replit
*/

const express = require('express');
const servidor = express();

servidor.get('/', (_, res) => {
  res.send('pronto');
});

servidor.listen(process.env['PORT'] || 3000);

const axios = require("axios");
const token = process.env['TOKEN'];

function formatarHora(data) {
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
}

let horaAntiga = formatarHora(new Date());
atualizarStatus(horaAntiga);

setInterval(() => {
    const horaAtual = new Date();
    const horaAtualFormatada = formatarHora(horaAtual);
    if (horaAntiga !== horaAtualFormatada) {
        atualizarStatus(horaAtualFormatada);
        horaAntiga = horaAtualFormatada;
    }
}, 100);

async function atualizarStatus(texto) {
    const payload = {
        'custom_status': {
            'text': texto,
            'expires_at': null,
            'emoji_id': "1108108210155552799",
        }
    };

    const headers = {
        'Authorization': token
    };

    try {
       await axios.patch('https://discordapp.com/api/v6/users/@me/settings', payload, { headers });
    } catch (error) {
        console.log(error);
    }
}
