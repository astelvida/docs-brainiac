import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createDocument = mutation({
  args: {
    title: v.string()
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError("Not authenticated")
    }

    const newDocument = await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId
    });
    return newDocument;
  },
});


export const getDocuments = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      return []
    }

    const documents = await ctx.db.query("documents")
      .withIndex("by_tokenIdentifier", q => q.eq('tokenIdentifier', userId))
      .collect();

    return documents;
  }
});