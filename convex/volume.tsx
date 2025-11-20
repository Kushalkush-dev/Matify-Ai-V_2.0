import { toast } from "sonner";
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
    const res =await ctx.db.insert("volumes",args)
    return res
  }

  }
)


export const getTotalVolumes=query({
  args:{
    createdBy:v.string()
  },
  handler:async(ctx,args)=>{

    try {
      const res = ctx.db.query("volumes").filter((q)=>q.eq(q.field("createdBy"),args.createdBy)).collect()
      return res
      
    } catch (error) {
      console.log("Error fetching All Volumes",error);
      toast.error("Could not fetch all resumes")            

    }
  }
})

export const getVolumesByChapter=query({
  args:{
    chapterId:v.string()
  },

  handler:async(ctx,args)=>{
    try {
      const res =ctx.db.query("volumes").filter((q)=>q.eq(q.field("chapterId"),args.chapterId)).collect()
      return res
    } catch (error) {
        console.log("Error fetching Volumes Based on Chapter",error);
        
    }
  }
})