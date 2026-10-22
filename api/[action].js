const crypto = require('crypto');

const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const TTL = Math.round(parseFloat(process.env.KEY_TTL_HOURS || '24') * 3600);
const MAX_PER_IP = parseInt(process.env.MAX_KEYS_PER_IP || '3', 10);
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/* ---------- Upstash (REST) ---------- */
async function post(path, body) {
  const r = await fetch(URL_ + path, { method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN }, body: JSON.stringify(body) });
  return r.json();
}
const cmd = async (...a) => {
