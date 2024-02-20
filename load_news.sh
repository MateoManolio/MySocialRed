#!/bin/bash
BASE_URL="http://localhost:3000/news"
JSON_FILE_PATH="backend/db/news.json"

# Verifica si el archivo JSON existe
if [ ! -f "$JSON_FILE_PATH" ]; then
  echo "Error: El archivo JSON no existe: $JSON_FILE_PATH"
  exit 1
fi

# Extrae los datos de las noticias y realiza la solicitud cURL POST
jq -c '.[] | {study, values: .[]}' "$JSON_FILE_PATH" | while IFS= read -r line; do
  # Extrae los campos necesarios utilizando jq
  study=$(echo "$line" | jq -r '.study')
  values=$(echo "$line" | jq -r '.values | @json')

  # Construye el JSON
  json_data="{\"study\":\"$study\",$values}"

  # Imprime el JSON antes de hacer la solicitud cURL
  echo "Enviando datos JSON:"
  echo "$json_data"

  # Realiza la solicitud cURL POST y maneja errores
  response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$json_data" "$BASE_URL")
  if [ "$response" -eq 200 ]; then
    echo "Solicitud exitosa"
  else
    echo "Error al enviar la solicitud: HTTP $response"
  fi

  echo "------------------------"
done
