import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const getProjects=query({
  args:{
    email:v.string()
  },
  handler:async(ctx,args)=>{
    const res=await ctx.db.query("project").filter((q)=>q.eq(q.field("createdBy"),args.email)).collect()
    return res;
}})



export const createProject=mutation({
  args:{
    createdBy:v.string(),
    title:v.string()
  },
  handler:async(ctx,args)=>{
    const res=await ctx.db.insert("project",args)
    return res
}})