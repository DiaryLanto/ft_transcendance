const crypto = require ('crypto');

const encrypt = async (raw, algo, key, outputEncoding) => {
    const iv = crypto.randomBytes(16).toString('base64');
    // console.log(key);
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

const totp_encrypt = {
    algo : "aes-256-cbc",
    key : "gpWR9E8pivM8AbhwWw7XxcJFnqCcacf2zRu0qGXXENM=",
    key_encoding: "base64",
    decryptedEncoding : 'base64'
}
        
//         const {encrypted, iv} = await encrypt({text:rawMessage, encoding:"utf-8"}, algo, key, decryptedEncoding);
//         const decrypted = await decrypt(toDecrypt, algo, key, 'utf-8');
module.exports = {
    encrypt,
    decrypt,
    totp_encrypt
}

