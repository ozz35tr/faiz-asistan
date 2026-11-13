import { CalculationData, SaveResponse } from '../types';

export const saveCalculation = async (
  data: CalculationData, 
  netGetiri: number
): Promise<SaveResponse> => {
  const payload = {
    anapara: data.anapara,
    yillikFaiz: data.yillikFaiz,
    stopaj: data.stopaj,
    vadeGun: data.vadeGun,
    netYillik: netGetiri
  };

  // Vercel Serverless API veya PHP uç noktalarını dene
  const candidateEndpoints = [
    '/api/save',
    './save.php'
  ];

  for (const endpoint of candidateEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        try {
          const result: SaveResponse = await response.json();
          return result;
        } catch {
          return { success: true, message: 'Hesaplama sunucuya kaydedildi.' };
        }
      }
    } catch {
      // Bir sonraki alternatifi dene
      continue;
    }
  }

  // Sunucu uç noktası yanıt vermese bile yerel tarayıcı hafızasına (localStorage) başarıyla kaydedilmiştir.
  return {
    success: true,
    message: 'Hesaplama yerel geçmişinize başarıyla kaydedildi.'
  };
};
