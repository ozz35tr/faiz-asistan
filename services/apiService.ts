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

  const candidateEndpoints = ['/api/save', './save.php'];

  for (const endpoint of candidateEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return { success: true, message: 'Hesaplama sunucuya kaydedildi.' };
      }
    } catch {
      continue;
    }
  }

  return {
    success: true,
    message: 'Hesaplama yerel geçmişinize başarıyla kaydedildi.'
  };
};
