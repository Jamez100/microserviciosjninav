// scripts/generarHash.js (ejecutar en tu máquina, no en el contenedor)
const bcrypt = require('bcryptjs');

(async () => {
  const passwordPlano = 'usuario123';
  const saltRounds    = 10;
  const hash           = await bcrypt.hash(passwordPlano, saltRounds);
  console.log('Hash bcryptjs generado:', hash);
})();
//npm install bcryptjs   # si aún no lo tienes instalado localmente
//node scripts/generarHash.js
