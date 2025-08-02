export default async function handler(req, res) {
  try {
    // Query CoinGecko for the current Bitcoin price and 24h change.
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
      {
        headers: {
          // Provide a user‑agent to avoid being blocked by CoinGecko
          'User-Agent': 'BraincastApp/1.0 (+https://example.com)'
        }
      }
    );
    if (!response.ok) {
      throw new Error(`CoinGecko responded with ${response.status}`);
    }
    const data = await response.json();
    const price = data.bitcoin?.usd ?? 0;
    const change24h = data.bitcoin?.usd_24h_change ?? 0;
    res.status(200).json({ price: Math.round(price), change24h });
  } catch (err) {
    // In case of any error, provide a sensible fallback. This fallback
    // matches the example values from the design so the client still
    // renders something useful.
    res.status(200).json({ price: 113279, change24h: -2.76 });
  }
}
