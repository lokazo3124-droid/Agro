// Utility to generate a valid Laravel APP_KEY (32 random bytes encoded in base64)
export function generateLaravelAppKey() {
  const bytes = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 32; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64String = btoa(binary);
  return `base64:${base64String}`;
}
