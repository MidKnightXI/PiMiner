import { cpu, cpuCurrentSpeed, cpuTemperature, time } from 'systeminformation';
import fetch from 'node-fetch'

main()

async function getSystemInfos() {
  let infos = {
    "brand": undefined,
    "avg_speed": undefined,
    "chipset_temp": undefined,
    "main_temps": undefined,
    "uptime": undefined,
  }
  let tmp = undefined
  tmp = await cpu()
  infos.brand = tmp.brand
  tmp = await cpuCurrentSpeed()
  infos.avg_speed = tmp.avg
  tmp = await cpuTemperature()
  infos.chipset_temp = tmp.chipset
  infos.main_temps = tmp.main
  tmp = time()
  infos.uptime = (Math.round((tmp.uptime/60) * 100) / 100).toFixed(2)
  tmp = null
  return infos
}

async function sendMessage(msg) {
  const data = await fetch(`https://smsapi.free-mobile.fr/sendmsg?user=${process.env.FREE_USER}&pass=${process.env.FREE_TOKEN}&msg=${encodeURI(msg)}`)
  console.log(data)
}

async function main() {
  const infos = await getSystemInfos()
  const message = `Hello master, here's the infos you asked for your machine:\n\n` +
  `  CPU name: ${infos.brand}\n  Average Speed: ${infos.avg_speed}Ghz\n  Overall Temperature: ${infos.main_temps}\n` +
  `  Chipset Temperature: ${infos.chipset_temp}\n  Uptime: ${infos.uptime} minutes\n\nHave a good day.`
  sendMessage(message)
}