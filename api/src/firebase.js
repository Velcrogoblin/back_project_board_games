require("dotenv").config();
const admin = require('firebase-admin');
const { FIREBASE_TYPE, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_CLIENT_ID, FIREBASE_AUTH_URI, FIREBASE_TOKEN_URI, FIREBASE_AUTH_PROVIDER_X509_CERT_URL, FIREBASE_CLIENT_X509_CERT_URL, UNIVERSE_DOMAIN } = process.env;


// Configura las credenciales de servicio de tu proyecto de Firebase
const serviceAccount = {
    "type": FIREBASE_TYPE,
  "project_id": FIREBASE_PROJECT_ID,
  "private_key_id": FIREBASE_PRIVATE_KEY_ID,
  "private_key": FIREBASE_PRIVATE_KEY,
  "client_email": FIREBASE_CLIENT_EMAIL,
  "client_id": FIREBASE_CLIENT_ID,
  "auth_uri": FIREBASE_AUTH_URI,
  "token_uri": FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": UNIVERSE_DOMAIN
};

// Inicializa la aplicación de administración de Firebase con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

// Define la función para actualizar el valor de emailVerified de un usuario
const actualizarEmailVerified = async(uid) => {
  try {
    await auth.updateUser(uid, {
      emailVerified: true
    });

  } catch (error) {
    console.error(error);
  }
}

const activeFalseUser = async (uid) => {
  try {
    await auth.updateUser(uid, {
      disabled: true
    });
  } catch (error) {
    console.error(error);
  }
}
const activeTrueUser = async (uid) => {
  try {
    await auth.updateUser(uid, {
      disabled: false
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  actualizarEmailVerified, 
  activeFalseUser,
  activeTrueUser
};
