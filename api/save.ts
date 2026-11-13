export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Yalnızca POST istekleri kabul edilir.'
    });
  }

  try {
    const body = req.body || {};
    const kayit = {
      id: 'calc_' + Date.now(),
      tarih: new Date().toISOString(),
      timestamp: Date.now(),
      anapara: Number(body.anapara) || 0,
      yillikFaiz: Number(body.yillikFaiz) || 0,
      stopaj: Number(body.stopaj) || 0,
      vadeGun: Number(body.vadeGun) || 0,
      netGetiri: Number(body.netYillik ?? body.netGetiri ?? 0)
    };

    return res.status(200).json({
      success: true,
      message: 'Hesaplama başarıyla kaydedildi.',
      kayit
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Kayıt sırasında bir hata oluştu.'
    });
  }
}
