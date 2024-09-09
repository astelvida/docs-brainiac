import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const newDocument = await ctx.db.insert(
      "documents", {
      title: args.title
    }
    );
    return newDocument;
  },
});


export const getDocuments = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query("documents").collect();
    return documents;
  }
});