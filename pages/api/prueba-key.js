export default async function handler(req, res) {
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  res.status(200).json({
    startsWith: rawKey?.startsWith('-----BEGIN PRIVATE KEY-----'),
    endsWith: rawKey?.endsWith('-----END PRIVATE KEY-----\\n') || rawKey?.endsWith('-----END PRIVATE KEY-----'),
    length: rawKey?.length,
    hasN: rawKey?.includes('\\n'),
    preview: rawKey ? rawKey.slice(0,50)+"..."+rawKey.slice(-50) : "NONE"
  });
}