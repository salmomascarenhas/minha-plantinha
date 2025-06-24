const axios = require('axios');

const API_KEY = 'COLE_AQUI_SUA_API_KEY'; 

// --- CONFIGURAÇÃO ---
const CONFIG = {
  API_KEY: API_KEY, 
  BASE_URL: 'http://localhost:3000',
  // Intervalo em milissegundos para enviar dados e verificar comandos
  INTERVAL: 10000, // 10 segundos
};

// --- FUNÇÕES DE SIMULAÇÃO ---

/**
 * Gera dados de sensores aleatórios dentro de uma faixa.
 */
function generateFakeSensorData() {
  const data = {
    temperature: parseFloat((Math.random() * (35 - 15) + 15).toFixed(2)), // entre 15 e 35 °C
    humidity: parseFloat((Math.random() * (80 - 30) + 30).toFixed(2)),    // entre 30% e 80%
    luminosity: parseFloat((Math.random() * (1000 - 200) + 200).toFixed(2)),// entre 200 e 1000 lux
  };
  console.log(`[DADOS GERADOS] Temp: ${data.temperature}°C, Umid: ${data.humidity}%, Luz: ${data.luminosity} lux`);
  return data;
}

/**
 * Envia os dados dos sensores para a API.
 */
async function sendSensorData() {
  if (CONFIG.API_KEY === API_KEY) return; 

  try {
    const data = generateFakeSensorData();
    await axios.post(`${CONFIG.BASE_URL}/device/sensor-readings`, data, {
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
 * Busca por comandos pendentes na API.
 */
async function fetchCommands() {
  if (CONFIG.API_KEY === API_KEY) return; 
  
  try {
    const response = await axios.get(`${CONFIG.BASE_URL}/device/commands`, {
      headers: { 'x-api-key': CONFIG.API_KEY },
    });
    
    const command = response.data.command;
    if (command) {
      console.log('✅ [COMANDO] Comando recebido:', command);
      // Aqui, o ESP32 real iria executar a ação (ex: acionar a bomba)
    } else {
      console.log('... [COMANDO] Nenhum comando pendente.');
    }
  } catch (error) {
    console.error('❌ [COMANDO] Erro ao buscar comandos:', error.response?.data?.message || error.message);
  }
}

// --- EXECUÇÃO PRINCIPAL ---

function main() {
  console.log('--- Mock do Dispositivo ESP32 Iniciado ---');
  if (CONFIG.API_KEY === API_KEY) {
    console.warn('AVISO: A API Key não foi configurada. O script não fará nada.');
    console.warn('Por favor, edite o arquivo esp32-mock.js com a chave gerada ao cadastrar uma planta.');
    return;
  }
  
  console.log(`Enviando dados a cada ${CONFIG.INTERVAL / 1000} segundos...`);
  
  sendSensorData();
  fetchCommands();
  
  setInterval(() => {
    sendSensorData();
    fetchCommands();
  }, CONFIG.INTERVAL);
}

main();