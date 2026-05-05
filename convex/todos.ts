import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getTodos = query({
    handler:async (ctx) =>{
        const todos = await ctx.db.query("todos").order("desc").collect()
        return todos ;
    }
});

export const addTodos = mutation({
    args:{text:v.string()},
    handler:async (ctx,args) =>{
        const todoId = await ctx.db.insert("todos",{
            text:args.text ,
            isCompleted:false
        })
    
        return todoId ;
    }
})


export const toggleTodo = mutation({
    args:{id:v.id("todos")},
    handler:async(ctx,args)=>{
        const todo = await ctx.db.get(args.id)
        if(!todo) throw new  ConvexError("todo not found")
         
        await ctx.db.patch(args.id,{
            isCompleted:!todo.isCompleted
        })    
    }
})

