import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  sessionOptions: {
    refetchWhenOffline: true,
  },
  plugins: [adminClient()],
});
