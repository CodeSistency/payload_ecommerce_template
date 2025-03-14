import { getPayload } from "payload"
import config from '@/payload.config'
import SeedButton from "./seedButton"

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

//   return <SeedButton payload={payload} />
return <SeedButton />

   }