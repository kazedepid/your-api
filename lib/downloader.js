import axios from 'axios'


export async function cobalt(config) {

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

  try {
    return await new Promise(async (resolve, reject) => {
      if (!(typeof config === "object")) return reject("invalid config input, config must be json object!")
      config = {
        url: config?.url || null,
        videoQuality: config?.videoQuality || "720",
        audioFormat: config?.audioFormat || "mp3",
        audioBitrate: config?.audioBitrate || "128",
        filenameStyle: config?.filenameStyle || "classic",
        downloadMode: config?.downloadMode || "auto",
        youtubeVideoCodec: config?.youtubeVideoCodec || "h264",
        youtubeDubLang: config?.youtubeDubLang || "en",
        alwaysProxy: config?.alwaysProxy || false,
        disableMetadata: config?.disableMetadata || false,
        tiktokFullAudio: config?.tiktokFullAudio || true,
        tiktokH265: config?.tiktokH265 || true,
        twitterGif: config?.twitterGif || true,
        youtubeHLS: config?.youtubeHLS || false
      }
      if (!config.url) return reject("missing url input!")
      axios.post("https://co.eepy.today/", config, {
        headers: {
          accept: "application/json",
          contentType: "application/json"
        }
      }).then(res => {
        const data = res.data
        if (data.status === "error") return reject("failed fetch content")
        resolve({
          success: true,
          result: data
        })
      }).catch(e => {
        if (e?.response?.data) return reject(e.response.data.error)
        else return reject(e)
      })
    })
  } catch (e) {
    return {
      success: false,
      errors: e
    }
  }
}
