const buildRewritePrompt = (script, topic = "", info = "") => {
  return `You are a scriptwriting assistant. Rewrite the following demo script to improve clarity, personalization, and tone.
Video Topic: ${topic}
Additional Info: ${info}

Original Script:
${script}

Rewritten Script:`
}

module.exports = { buildRewritePrompt }
