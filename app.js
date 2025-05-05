async function summarizeText() {
    const inputText = document.getElementById("inputText").value.trim();
    const outputDiv = document.getElementById("summaryOutput");
  
    if (!inputText) {
      outputDiv.innerText = "⚠️ Please enter some text to summarize.";
      return;
    }
  
    outputDiv.innerText = "Summarizing...";
  
    const payload = {
      model: "tinyllama-1.1b-chat-v1.0",
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes texts." },
        { role: "user", content: `Please summarize the following text:\n\n${inputText}` }
      ],
      temperature: 0.7,
      max_tokens: 100
    };
  
    try {
      const response = await fetch("http://localhost:1234/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const summary = data.choices[0].message.content;
      outputDiv.innerText = summary;
    } catch (error) {
      outputDiv.innerText = `Error summarizing text: ${error.message}`;
      console.error(error);
    }
  }
  