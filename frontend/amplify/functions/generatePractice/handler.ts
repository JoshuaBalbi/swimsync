import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1",
});

export const handler = async (event: any) => {
  const {
    practiceType,
    focus,
    totalAmount,
    level,
    notes,
  } = event.arguments;

  const prompt = `
You are an experienced swim coach. Generate a structured swim practice.

Practice Type: ${practiceType}
Focus: ${focus}
Yardage / Duration: ${totalAmount}
Swimmer Level: ${level}
Coach Notes: ${notes}

Return the practice in this exact format:

Warmup:
Pre-Set:
Main Set:
Post-Set:
Cooldown:
Coach Notes:

r# = rounds if you decide to use rounds otherwise ignore it and just write # X yardage
r# X ( # X yards (type of swim/kick or pull or stroke) (description) (interval) 

Make it realistic, clear, and ready for a coach to edit.
`;

  const body = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1200,
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: [
            {
                type: "text",
                text: prompt
            },
        ],
      },
    ],
  };

  const command = new InvokeModelCommand({
    modelId: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(body),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(
    new TextDecoder().decode(response.body)
  );

  return responseBody.content?.[0]?.text || "No practice generated.";
};