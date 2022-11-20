import axios from 'axios'
class GoogleCloudController {

    async getResults(req: any, res: any) {
        try {
            const {image_send} = req.body
            if(!image_send){
                return res.status(400).json({message: 'Скриншот не был передан'})
            }
            const response = await axios.post('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze', {
                "folderId": process.env.VISOR_FOLDER,
                "analyze_specs": [{
                    "content": image_send.split('base64,')[1],
                    "features": [{
                        "type": "TEXT_DETECTION",
                        "text_detection_config": {
                            "language_codes": ["*"],
                        }
                    }]
                }]
              },
              {
                headers:{
                    'Authorization' : `Bearer ${process.env.VISOR_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }    
            }
              )
              let array_words = '';
              for(let page = 0; page < response.data.results[0].results[0].textDetection.pages.length; page++){
                for(let block = 0; block < response.data.results[0].results[0].textDetection.pages[page].blocks.length; block++){
                    for(let line = 0; line < response.data.results[0].results[0].textDetection.pages[page].blocks[block].lines.length; line++){
                        if(line !== 0){
                            array_words = array_words + "\n"
                        }
                        for(let i = 0; i < response.data.results[0].results[0].textDetection.pages[page].blocks[block].lines[line].words.length; i++){
                            array_words = array_words + " " + response.data.results[0].results[0].textDetection.pages[page].blocks[block].lines[line].words[i].text
                        }
                      }
                  }
              }
              let text = array_words
            return res.json(text)
        } catch (error) {
           return res.status(400).json({message: error})
        }

    }

}
module.exports = new GoogleCloudController();