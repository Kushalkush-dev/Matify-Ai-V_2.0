import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createVolume=mutation({
  args:{
    volumeTitle:v.string(),
    chapterId:v.string(),
    createdBy:v.string(),
    document:v.string(),
    whiteboard:v.string()
  },
  handler:async(ctx,args)=>{
    const res =await ctx.db.insert("volume",args)
    return res
  }

  }
)