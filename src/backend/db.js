const { MongoClient } = require("mongodb");


const url = "mongodb+srv://root:root@cluster0.uszch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "todolist";

async function add(todo) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         const col = db.collection("todo");
         
         let taskData = {
          "task_name": todo.taskName,
          "task_id": todo.taskId,                                                                                                                              
          "subtask_id": todo.subtaskId,
        }

        const p = await col.insertOne(taskData);
        const myDoc = await col.findOne();

        console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
add().catch(console.dir);

export default add;