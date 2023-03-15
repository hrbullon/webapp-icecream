// ================
// Dirección del Cliente que va a consumir el API
// ================
process.env.CLIENT_ENV = process.env.CLIENT_ENV || "http://localhost:3000";

// ================
// Puerto
// ================
process.env.PORT = process.env.PORT || 8000;

// ================
// Entorno
// ================
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ================
// Mysql
// ================
process.env.DB_HOSTNAME = process.env.DB_HOSTNAME || 'localhost';
process.env.DB_USER = process.env.DB_USER || 'root';
process.env.DB_PASS = process.env.DB_PASS || '';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'jmw';
