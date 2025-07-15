const axios = require('axios');

const API_KEY = 'a87caa2da3d5845635bd8b04cac7118e0b9c9407140e8148681bd7458663a9f7'; 

const CONFIG = {
  API_KEY: API_KEY, 
  BASE_URL: 'http://localhost:3000', 
  INTERVAL: 10000, // 10 segundos
};

let mockDeviceState = {
  lonaFechada: false, 
  bombaLigada: false,
};

/**
 * Gera dados de sensores aleatórios, refletindo a realidade do hardware.
 */
function generateFakeSensorData() {
  const estaChovendo = Math.random() < 0.1;

  const umidade_solo = Math.floor(Math.random() * (3000 - 500) + 500); // Faixa de 500 a 3000

  let status_solo;
  if (umidade_solo > 1800) status_solo = 0; // seco
  else if (umidade_solo >= 1000) status_solo = 1; // úmido
  else status_solo = 2; // encharcado

  if (!mockDeviceState.bombaLigada) {
    mockDeviceState.bombaLigada = status_solo === 0; // Liga a bomba se o solo estiver seco
  }
  
  mockDeviceState.lonaFechada = estaChovendo;

  const data = {
    umidade: umidade_solo,
    chuva: estaChovendo ? 0 : 1, // 0 para chuva, 1 para sem chuva
    status_bomba: mockDeviceState.bombaLigada ? 1 : 0,
    status_lona: mockDeviceState.lonaFechada ? 0 : 1, // 0 fechada, 1 aberta
    status_solo: status_solo,
    status_wifi: Math.floor(Math.random() * (-40 - -80) + -80), // Sinal entre -80 e -40 dBi
    nivel_agua: parseFloat((Math.random() * 21).toFixed(2)), // Nível entre 0 e 21 cm
  };

  console.log(`[DADOS GERADOS]`, data);
  return data;
}

/**
 * Envia os dados dos sensores para a API.
 */
async function sendSensorData() {
  if (!CONFIG.API_KEY) return; 

  try {
    const data = generateFakeSensorData();
    await axios.post(`${CONFIG.BASE_URL}/api/device/sensor-readings`, data, {
      headers: {
        'x-api-key': CONFIG.API_KEY,
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ [SENSOR] Dados enviados com sucesso para a API.');
  } catch (error) {
    console.error('❌ [SENSOR] Erro ao enviar dados:', error.response?.data?.message || error.message);
  }
}

/**
 * Busca por comandos pendentes e ATUALIZA O ESTADO INTERNO DO MOCK.
 */
async function fetchCommands() {
  if (!CONFIG.API_KEY) return; 
  
  try {
    const response = await axios.get(`${CONFIG.BASE_URL}/api/device/commands`, {
      headers: { 'x-api-key': CONFIG.API_KEY },
    });
    
    const command = response.data.command;
    if (command) {
      console.log('✅ [COMANDO] Comando recebido:', command);
      
      if (command.action === 'TOGGLE_COVER') {
        mockDeviceState.lonaFechada = !mockDeviceState.lonaFechada;
        console.log(`[MOCK STATE] Estado da lona alterado para: ${mockDeviceState.lonaFechada ? 'FECHADA' : 'ABERTA'}`);
      }
      if (command.action === 'WATER_PUMP') {
        console.log('[MOCK STATE] Bomba ligada manualmente por 5 segundos...');
        mockDeviceState.bombaLigada = true;
        setTimeout(() => {
          mockDeviceState.bombaLigada = false;
          console.log('[MOCK STATE] Bomba desligada após o tempo.');
        }, 5000);
      }

    } else {
      console.log('... [COMANDO] Nenhum comando pendente.');
    }
  } catch (error) {
    console.error('❌ [COMANDO] Erro ao buscar comandos:', error.response?.data?.message || error.message);
  }
}

// --- EXECUÇÃO PRINCIPAL ---
function main() {
  console.log('--- Mock do Dispositivo ESP32 (Refatorado) Iniciado ---');
  if (!CONFIG.API_KEY || CONFIG.API_KEY === 'COLE_AQUI_SUA_API_KEY') {
    console.warn('AVISO: A API Key não foi configurada no arquivo esp32-mock.js.');
    return;
  }
  
  console.log(`Enviando dados e buscando comandos a cada ${CONFIG.INTERVAL / 1000} segundos...`);
  
  sendSensorData();
  fetchCommands();
  
  setInterval(() => {
    sendSensorData();
    fetchCommands();
  }, CONFIG.INTERVAL);
}

main();