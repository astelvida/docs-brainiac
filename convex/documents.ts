import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError("Not authenticated")
    }

    const newDocument = await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId
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


export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});


export const getDocument = query({
  args: {
    documentId: v.id('documents')
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError("Not authenticated")
    }

    const document = await ctx.db.get(args.documentId);

    if (!document || document.tokenIdentifier !== userId) {
      throw new ConvexError("Document not found")
    }

    console.log("{document}", { document })
    return { ...document, documentUrl: await ctx.storage.getUrl(document.fileId) };
  }
});