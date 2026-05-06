import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "swimSyncMeetFiles",
  access: (allow) => ({
    "meet-files/*": [
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});