const crypto = require ('crypto');
const rawMessage = "I am a top secret message";
const encryptionKey = "gpWR9E8pivM8AbhwWw7XxcJFnqCcacf2zRu0qGXXENM=";

const encrypt = async (raw, algo, key, outputEncoding) => {
    const iv = crypto.randomBytes(16).toString('base64');
    const cipher = crypto.createCipheriv(algo, Buffer.from(key.key, key.encoding), Buffer.from(iv, 'base64'));
    let encrypted = cipher.update(raw.text, raw.encoding, outputEncoding);
    encrypted += cipher.final(outputEncoding);
    return {encrypted, iv};
}

const decrypt = async (encrypted, algo, key, outputEncoding) => {
    const decipher = crypto.createDecipheriv(algo, Buffer.from(key.key, key.encoding), Buffer.from(encrypted.iv, 'base64'));
    let decrypted = decipher.update(encrypted.data, encrypted.encoding, outputEncoding);
    decrypted += decipher.final(outputEncoding);
    return decrypted;
}

const test = async () => {
    try {
        const algo = "aes-256-cbc";
        const key = {key:encryptionKey, encoding: "base64"};
        const decryptedEncoding = 'base64';
        
        const {encrypted, iv} = await encrypt({text:rawMessage, encoding:"utf-8"}, algo, key, decryptedEncoding);
        console.log(encrypted);
    
        const toDecrypt = {data: encrypted, encoding:decryptedEncoding, iv: iv};
        const decrypted = await decrypt(toDecrypt, algo, key, 'utf-8');
        console.log(decrypted);
    } catch (error) {
        console.error(error);
    }
}

test();

