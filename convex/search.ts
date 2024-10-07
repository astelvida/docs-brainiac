import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import OpenAI from "openai";


const openai = new OpenAI();

export const searchAction = action({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }
    const result = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: args.search,
      encoding_format: "float",
    });

    const embedding = result.data[0].embedding

    const documentResults = await ctx.vectorSearch(
      "documents",
      "by_embedding",
      {
        vector: embedding,
        limit: 5,
        filter: (q) => q.eq("tokenIdentifier", userId),
      }
    );

    const records: (
      { type: "documents"; score: number; record: Doc<"documents"> }
    )[] = [];

    await Promise.all(
      documentResults.map(async (result) => {
        const document = await ctx.runQuery(api.documents.getDocument, {
          documentId: result._id,
        });
        if (!document) {
          return;
        }
        records.push({
          record: document,
          type: "documents",
          score: result._score,
        });
      })
    );

    records.sort((a, b) => b.score - a.score);

    return records;
  },
});