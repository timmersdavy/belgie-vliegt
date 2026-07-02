// Proxy voor ADS-B Exchange (militaire vluchten) — houdt de RapidAPI-sleutel
// op de server, zodat hij niet in de publieke pagina staat.
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=15');
  try {
    const r = await fetch('https://adsbexchange-com1.p.rapidapi.com/v2/lat/50.5/lon/4.5/dist/250/', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
      },
    });
    if (!r.ok) throw new Error('ADS-B Exchange HTTP ' + r.status);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
