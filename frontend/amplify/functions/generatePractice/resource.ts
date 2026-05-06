import { defineFunction } from "@aws-amplify/backend";

export const generatePractice = defineFunction({
    name: "generatePractice",
    entry: "./handler.ts",
    timeoutSeconds: 30,
});
