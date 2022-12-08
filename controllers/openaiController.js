const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const response = await axios.get(
    `https://api.pawan.krd/gtranslate?from=ckb&to=en&text=${prompt}`
  );
  let translatedPrompt = response.data.translated;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt: translatedPrompt,
      n: 1,
      size: imageSize,
    });
    const imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "not generate image",
    });
  }
};

module.exports = { generateImage };
