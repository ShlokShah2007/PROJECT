const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the GlobeTrotter trip assistant. You help travelers plan
itineraries across cities, suggest realistic activities and budgets, and answer
questions about the trip they're currently building. Keep answers concise and
practical. Never invent flight prices — flag them as estimates.`;

/**
 * @param {{message: string, tripContext?: object, userId: number}} params
 * @returns {Promise<string>} assistant reply text
 */
async function askTripAssistant({ message, tripContext, userId }) {
  const contextBlock = tripContext ? `\n\nCurrent trip context:\n${JSON.stringify(tripContext)}` : '';

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: message + contextBlock }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock ? textBlock.text : '';
}

module.exports = { askTripAssistant };
