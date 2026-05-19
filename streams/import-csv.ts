import fs from "node:fs"
import path from "node:path"
import { parse } from "csv-parse"

const CSV_PATH = path.join(process.cwd(), "streams", "tasks.csv")

const API_URL = "http://localhost:3333/tasks"

async function importCSV() {
  const fileStream = fs.createReadStream(CSV_PATH)

  const parser = fileStream.pipe(
    parse({
      trim: true,
      skip_empty_lines: true,
      from_line: 2,
    }),
  )

  console.log("Iniciando a importação do CSV...")

  for await (const row of parser) {
    const [title, description] = row

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })

      if (response.ok) {
        console.log(`Sucesso: "${title}" importada com sucesso.`)
      } else {
        const errorData = await response.json()
        console.error(`Erro ao importar "${title}":`, errorData)
      }
    } catch (error) {
      console.error(`Falha de rede ao enviar "${title}":`, error)
    }
  }

  console.log("🏁 Importação concluída!")
}

importCSV()
