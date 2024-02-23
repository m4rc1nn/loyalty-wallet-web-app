const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("529713454793-b4kpmhjp0htl668i7dq72rl70v16isf8.apps.googleusercontent.com");

module.exports.verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "529713454793-b4kpmhjp0htl668i7dq72rl70v16isf8.apps.googleusercontent.com", // Podaj tu swój Client ID z konfiguracji OAuth 2.0 w Google Cloud Console
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"]; // ID użytkownika w Google
    const email = payload["email"]; // Adres e-mail użytkownika
    const name = payload["name"]; // Nazwa uzytkownika
    return { userId: userid, email: email, name: name };
};
