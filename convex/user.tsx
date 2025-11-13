import { mutation, query } from "./_generated/server";
import { v } from "convex/values";




export const getUser=query({
  args:{
    email:v.string()
  },
  handler:async(ctx,args)=>{
   const res= await ctx.db.query("user").filter((q)=>q.eq(q.field("email"),args.email)).collect()

   return res;
  }
})



export const CreateUser=mutation({
args:{
  name:v.string(),
  email:v.string(),
  image:v.string()
},
handler:async(ctx,args)=>{
  const res= await ctx.db.insert("user",args);
  return res;
}

})