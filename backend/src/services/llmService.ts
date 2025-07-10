import { GoogleGenerativeAI } from '@google/generative-ai';
import { Plant, SensorData } from '@prisma/client';

if (!process.env.GEMINI_API_KEY)
  throw new Error('A variável de ambiente GEMINI_API_KEY não está definida.');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Gera um insight (relatório de saúde e dica) para uma planta com base nos seus dados.
 * @param plant - O objeto da planta.
 * @param latestReading - A última leitura dos sensores para a planta.
 * @returns Uma string com o texto gerado pela IA.
 */
export const generatePlantInsight = async (
  plant: Plant,
  latestReading: SensorData | null,
): Promise<string> => {
  if (!latestReading)
    return 'Ainda estou aguardando os primeiros dados dos sensores para saber como estou me sentindo!';

  const prompt = `
    Você é o "Caquito", o mascote amigável e um pouco dramático de uma planta.
    Sua espécie é: ${plant.species}.
    Seu nome é: ${plant.name}.

    Seus dados de sensores mais recentes são:
    - Umidade do solo: ${latestReading.humidity.toFixed(1)}%
    - Temperatura: ${latestReading.temperature.toFixed(1)}°C
    - Luminosidade: ${latestReading.luminosity.toFixed(0)} lux

    Com base nesses dados, escreva um pequeno relatório de saúde (2 a 4 frases) em primeira pessoa, como se você fosse a própria planta.
    Use um tom divertido, pessoal e às vezes, você pode exagerar um pouco, como se estivesse fazendo uma dramatização ou uma piada. O relatório deve refletir se as condições estão boas ou ruins. 
    No final, adicione uma nova linha e forneça uma "Dica do Caquito:" com uma sugestão prática ou uma curiosidade interessante sobre sua espécie (${
      plant.species
    }).
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insight = response.text();

    if (!insight) throw new Error('A IA não retornou um conteúdo válido.');

    return insight.trim();
  } catch (error) {
    console.error('Erro ao se comunicar com a API do Gemini:', error);
    throw new Error('Não foi possível contatar o assistente de IA no momento.');
  }
};
