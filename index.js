import { cpu, cpuCurrentSpeed, cpuTemperature, time } from 'systeminformation';

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
  infos.uptime = tmp.uptime/60
  tmp = null
  return infos
}

async function getCryptoInfos() {
  let infos = {
    "value": undefined
  }
  return infos
}