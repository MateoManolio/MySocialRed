#!/bin/bash

BASE_URL="http://localhost:3000/news"

# Ruta al archivo JSON
JSON_FILE_PATH="backend/db/news.json"

# Extrae los datos de las noticias y realiza la solicitud cURL POST
jq -c 'to_entries[] | {study: .key, values: .value[]}' "$JSON_FILE_PATH" | while IFS= read -r line; do
  # Extrae los campos necesarios utilizando jq
  study=$(echo "$line" | jq -r '.study')
  title=$(echo "$line" | jq -r '.values.title')
  description=$(echo "$line" | jq -r '.values.description')
  date=$(echo "$line" | jq -r '.values.date')
  user=$(echo "$line" | jq -r '.values.user')
  url=$(echo "$line" | jq -r '.values.url')
  urlToImage=$(echo "$line" | jq -r '.values.urlToImage')
  stars=$(echo "$line" | jq -r '.values.stars')

  # Construye el JSON
  json_data="{\"study\":\"$study\",\"title\":\"$title\",\"description\":\"$description\",\"date\":\"$date\",\"user\":\"$user\",\"url\":\"$url\",\"urlToImage\":\"$urlToImage\",\"stars\":$stars}"

  # Imprime el JSON antes de hacer la solicitud cURL
  echo "Sending JSON data:"
  echo "$json_data"

  # Realiza la solicitud cURL POST
  curl -X POST -H "Content-Type: application/json" -d "$json_data" "$BASE_URL"

  echo "------------------------"
done

