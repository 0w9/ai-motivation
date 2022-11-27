import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Give me advice on my current life situation and how to change it:

My life situation: `


const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}
      Advice in one paragraph: `,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}
    Detailed advice: ${basePromptOutput}
    Summary of the advice, less than 10 words: `,
    temperature: 0.7,
    max_tokens: 250,
  });

  const secondCompletionOutput = secondCompletion.data.choices.pop()

  res.status(200).json({ output: basePromptOutput, tldr: secondCompletionOutput });
};

export default generateAction;