---
layout: ../../layouts/Post.astro
title: "Poor man's data analysis with OpenAI"
date: "2023-09-27T17:10:00.284Z"
description: "Poor man's data analysis with OpenAI"
filepath: "/poor-mans-data-analysis-with-openai"
cover: "/images/blog/cover-ai.jpg"
---

# Poor man's data analysis with OpenAI

Antonio Gioia, 2023

---

![Cover](https://antoniogioia.com/images/blog/cover-ai.jpg)

---

Ever since [OpenAI](https://openai.com) provided access to their _GPT-4_ API, I've been contemplating how to utilize it for data analysis of my own database. Although I'm not a data scientist, I'm familiar with the tools and techniques used in data science. I understand that I should ideally use something like Python/Pandas for comprehensive analysis of structured and unstructured data. However, today I'm feeling a bit lazy yet creative, and I want to find a solution that involves just some _javascript_ and a bit of _prompt engineering_.

At work i manage a document-based database of properties. Each property has data such as city, address, zone, and category (apartment, studio flat, etc.). Some properties may have available rooms, which can either be single or double rooms. Each room has a monthly rent cost and information about the tenants, including the type of tenants renting the house (students, erasmus, etc.). How can I use AI to analyze this data in the database and get answers to questions like:

- Can you provide a list of available rooms in apartments in Rome?
- What's the cheapest room available for students in Rome?
- Are there any available rooms in the Stazione Termini zone in Rome?

I repeat, the optimal solution would typically involve using some Python code utilizing Langchain and so forth. However, today **I want to HAVE FUN** and conduct an experiment.

What I need:

- A database with a large amount of data to query
- An [OpenAI API key](https://platform.openai.com/account/api-keys)
- A method to stream the OpenAI response back to me

The constraints I need to consider:

- OpenAI API requests cost money ($$$), so I must optimize the use of tokens
- Prompts have a length limit
- My database is quite large so I need to find a way to restrict the scope of the query

## Chat with your database

I have everything I need to start: I have an API key loaded with tokens, and I have a method to stream OpenAI responses because I will be using the latest version of [NextJs](https://nextjs.org) (13.5), which supports streaming responses with the new _"app router"_ and [Vercel AI SDK](https://github.com/vercel/ai).

In this article i'm not going to explain the code in details. Instead I will explain the concept and let your creativity do the rest, I assume that you are an experienced developer.

Remember, I want the AI to answer questions like this and provide results coming from my database:

- _Can you provide a list of available rooms in apartments in Rome?_

How do I achieve it?

Well, here comes the **poor man's data analysis with OpenAI**! :)

Firstly, I need to instruct the AI to **_act as a personal assistant and to only respond to questions related to room renting_**.

Given the large size of the database, I need the AI to understand the user's request and **identify the city** in which the user is seeking a room. This way, I can query the database for a much smaller data set and keep the request within the token limit. The best way to achieve this is to use the [Chat completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api) along with some prompt engineering.

Here are the steps for the entire process:

1. The user types the question in the form.
2. On the backend, I receive the question and attempt to understand it.
3. The user's question must contain a city where they are looking for rooms. If no city is specified, return to step 1 and provide the user with a list of available cities.
4. If the user's question contains a city, query the database for available rooms in that city (I use more filters to get a smaller dataset, this is just an example).
5. Get the response from the database and create a textual CSV containing available rooms.
6. Send the textual CSV with an engineered prompt to the OpenAI API and ask GPT to match the rooms according to the user's question.
7. Instruct the AI to follow a certain template for the answer.

All these steps (except the first) occur behind the scenes and it only takes a few seconds for a response, which is 99.5% of the time correct (yay!). I've noticed that GPT-4 is quite impressive at understanding structured data, which is why I prepare a textual CSV with the data from the database.

**_You might be wondering, why use a CSV and not just a JSON?_** Well, with a CSV, I can fit more data to send to the OpenAI API. If I have many Javascript objects coming from database, with a CSV, I can use the object keys as heading columns and extract the data into those columns. Instead with JSON, I would need to repeat the object keys for each room, making the request too large and consuming my tokens instantly.

Tip: Be smart with database output!
Use meaningful labels for keys, labels that can help GPT understand your data. I'll provide an example of what I mean using MongoDB projections. Let's say you have a property document like this:

```javascript
{
    _id: 'dh4u83d',
    room: [
        cost: '250',
        type: 'single',
    ]
}
```

Since the keys of the document are going to be the heading columns in the first line of the CSV, project the result with better names:

```javascript
{
    propertyId: '$_id',
    roomCost: { $concat: ['$room.cost', ' €']},
    roomType: '$room.type',
}
```

**_Ok, but the dataset must be small._**
Indeed, this works if you manage to restrict the dataset to a maximum of 30-40 rows. It's up to you to understand the user's question and pick bits of information to filter out unnecessary data.

**_How do you understand the question and retain that information during the dialogue?_**

Let's take, for example, the code from the Vercel AI SDK documentation on how to display the response in a JSX component:

```javascript
return (
  <div>
    {messages.map((m) => (
      <div key={m.id}>
        {m.role}: {m.content}
      </div>
    ))}
  </div>
);
```

The **_*messages*_** array from the OpenAI response contains the list of messages exchanged between the user and the AI. As soon as the user sends a question from the form, the messages array would be:

```javascript
console.log(messages)[
  // messages array contains:
  {
    role: "user",
    content: "Can you provide a list of available rooms in apartments?",
  }
];
```

As you continue the conversation with the AI, the array will also contain the assistant's responses:

```javascript
console.log(messages)

[
    // messages array contains:
    {"role": "user", "content": "Can you provide a list of available rooms in apartments"}
    {"role": "assistant", "content": "Where do you want to find a room? You can choose: Rome, Milan, Florence"}
    {"role": "user", "content": "i want a room in rome"}
]
```

I've written a React hook that retrieves the last city mentioned by the user every time the **_*messages*_** array changes. It contains a function similar to the following, which reads the messages array in reverse. Why in reverse? Because the user may want to search for a room in a different city and I need to fetch the data based on the user's most recent request.

```javascript
// cities comes from my own database

function getLastCityMention(messages, cities) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role === "user") {
      const content = message.content.toLowerCase();
      for (const city of cities) {
        if (content.includes(city.toLowerCase())) {
          return city;
        }
      }
    }
  }
  return null;
}
```

**_Ok, but how do I instruct the AI to act like some kind of *room finder assistant*?_**

With **_promot engineering_**!
I've spent an insane amount of time testing and improving my prompts, experimenting with various types of requests and analyzing the responses.

Let's see how to actually send the prompts to OpenAI API, as explained in the [library documentation](https://github.com/vercel/ai):

```javascript
export async function POST(req) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

Let's say we are having the conversation:

```javascript
[
    // messages array contains:
    {"role": "user", "content": "Can you provide a list of available rooms in apartments"}
    {"role": "assistant", "content": "Where do you want to find a room? You can choose: Rome, Milan, Florence"}
    {"role": "user", "content": "i want a room in rome"}
]
```

As soon as the user sends the last message ("i want a room in rome"), our hook captures the city in which the user is interested and includes it in the request to our backend API (otherwise, the city would be _null_).

The code in the backend will query the database since _city_ is not _null_ and will create the textual CSV with the response data. At this point we can add into the **_messages_** array a new element of the array containing an elaborated prompt message with "_role_" as "_system_" setting the instructions to the assistant on how it has to give the response:

```javascript
const prompt = [
  ...messages, // include all previous messages to keep a context of dialogue
  {
    role: "system",
    content: `This is the rooms data for ${city}: ${CSV}. 
        Answer with best matching rooms according to the user request, for each matching room use its data to create a human readable text about the room.
        Answer in italian. 
        Output in Markdown. `,
  }, // interpolate data coming from database into prompt
];
```

And we send this new **_messages_** array to OpenAI API:

```javascript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  stream: true,
  messages: prompt,
  temperature: 0, // temperature is set to 0 because i don't want AI to get creative with my data
});
```

And the user will receive the best matching rooms from the textual CSV, streamed directly to their browser!

The same pattern is used in the user's very first question, where we need to identify the city before creating the CSV for the response. Our hook will return that the city is _null_ if no city is found in the messages. In that case, I craft a prompt for OpenAI that asks the user for a city again:

```javascript
// the list of allowed cities comes from my database

const prompt = [
  {
    role: "system",
    content: `No city found. Tell the user that has to choose one of the following cities: ${cities}. 
        Answer in italian. 
        Output in Markdow.`,
  },
];
```

As you can see in this prompt, I'm not adding any other message to the array. Essentially, until we understand the city, we will not proceed further with the dialogue.

## Is this a viable solution in production?

In a production environment? Probably not, as it could become expensive if you have a large number of users. I would recommend using this solution for internal tools or for a feature used by a small group of people.

The possibilities are endless. However, as I mentioned earlier, this is just a fun example, and the proper way to achieve this would be through more analytical methods.

Consider this some kind of "shortcut" to analyze your internal data.

- You can experiment with prompts and find ways to create fixed boundaries (for instance, if you are building a property assistant, it should not start discussing philosophy)
- You should restrict the data set as much as possible to save tokens! Look at my example on how I manage to understand the city where the user is interested in finding rooms. You can create more filters built into the dialogue, and with the proper parameters, you can filter a database of a few million rows into a couple dozen results. At that point, it's easy for GPT-4 to understand it
- In your prompts you can define templates that AI _has to follow_ when giving a response

---

Are you interested in applying this method to your data, or would you like to explore different solutions together?
Feel free to contact me via email: [info@antoniogioia.com](mailto:info@antoniogioia.com)

---

Cover image generated with [Adobe Firefly AI](https://www.adobe.com/sensei/generative-ai/firefly.html)
