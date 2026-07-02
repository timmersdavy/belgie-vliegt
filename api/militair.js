// Militaire vluchten via adsb.fi open data (gratis, geen sleutel nodig).
// Het /v2/mil-endpoint geeft wereldwijd alle militair-gemarkeerde toestellen;
// hier filteren we op de ruime omgeving van Belgie en zetten we de
// military-vlag die de pagina verwacht.
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=15');
  try {
    const r = await fetch('https://opendata.adsb.fi/api/v2/mil', {
      headers: { 'Accept': 'application/json' },
    });
    if (!r.ok) throw new Error('adsb.fi HTTP ' + r.status);
    const data = await r.json();
    const ac = (data.ac || [])
      .filter(a => a.lat >= 49.0 && a.lat <= 52.0 && a.lon >= 2.0 && a.lon <= 6.8)
      .map(a => ({ ...a, military: true }));
    res.status(200).json({ ac });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
