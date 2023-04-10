import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import * as dotenv from "../dataviz/node_modules/dotenv/lib/main"
dotenv.config({ path: path.join(__dirname, "./.env.local") })
