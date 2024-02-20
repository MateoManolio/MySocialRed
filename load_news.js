const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000/news';
const JSON_FILE_PATH = 'backend/db/news.json';

// Lee el archivo JSON
fs.readFile(JSON_FILE_PATH, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON:', err);
    return;
  }

  try {
    const noticias = JSON.parse(data);

    // Itera sobre cada categoría de noticias
    for (const categoria in noticias) {
      if (Object.hasOwnProperty.call(noticias, categoria)) {
        const noticiasCategoria = noticias[categoria];
        
        // Itera sobre cada noticia en la categoría
        for (const noticia of noticiasCategoria) {
          try {
            // Construye el objeto JSON con el nombre de la categoría
            const json_data = { "study": categoria, ...noticia };

            // Realiza la solicitud POST para la noticia
            const response = await axios.post(BASE_URL, json_data);
            console.log('Solicitud exitosa:', response.status);
          } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error al analizar el archivo JSON:', error);
  }
});
