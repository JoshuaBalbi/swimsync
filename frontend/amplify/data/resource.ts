import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/


const schema = a.schema({
  UserProfile: a
    .model({
      cognitoUserId: a.string().required(),
      email: a.string().required(),

      firstName: a.string().required(),
      lastName: a.string().required(),
      dateOfBirth: a.string(),
      gender: a.string(),

      role: a.string().required(), // coach or swimmer

      activeTeamId: a.string(),
      onboardingComplete: a.boolean(),
    })
    .authorization((allow) => [allow.owner()]),

  Team: a
    .model({
      name: a.string().required(),
      joinCode: a.string().required(),
      createdByUserId: a.string().required(),
      headCoachName: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),

  TeamMembership: a
    .model({
      teamId: a.string().required(),
      userProfileId: a.string().required(),
      userEmail: a.string().required(),
      userName: a.string().required(),
      role: a.string().required(), // coach or swimmer
      status: a.string().required(), // pending, approved, rejected
      membershipType: a.string(), // headCoach, assistantCoach, swimmer
    })
    .authorization((allow) => [allow.authenticated()]),

  Practice: a
    .model({
      title: a.string().required(),
      date: a.string().required(),
      type: a.string().required(), // Swim, Lift, Dryland
      focus: a.string(),
      totalAmount: a.string(),
      mainSet: a.string(),
      workoutText: a.string().required(),
      notes: a.string(),

      visibility: a.string().required(), // public or private
      teamId: a.string(),
      coachId: a.string().required(),
      coachName: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),

  Meet: a
    .model({
      teamId: a.string(),
      name: a.string().required(),
      location: a.string(),
      startDate: a.string().required(),
      endDate: a.string(),
      season: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),

  RaceTime: a
    .model({
      meetId: a.string(),
      meetName: a.string(),

      swimmerId: a.string().required(),
      swimmerName: a.string(),
      teamId: a.string(),

      event: a.string().required(),
      stroke: a.string(),
      distance: a.integer(),
      course: a.string().required(),

      time: a.string().required(),
      timeInSeconds: a.float().required(),

      raceDate: a.string().required(),
      location: a.string(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
