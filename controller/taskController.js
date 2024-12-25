import User from "../model/user.js";
import Task from "../model/Task.js";

export const createTask=async(req,res)=>{
    try {
        const { title, description, priority,assignedBy, assignedTo, dueDate } = req.body;
    console.log(req.body);

        if (!title || !assignedTo || !dueDate) {
          return res
            .status(400)
            .json({ success: false, message: "Missing required fields" });
        }
    
        // Validate dueDate
        const currentDate = new Date().setHours(0, 0, 0, 0); // Current date with time reset to 00:00:00
        const inputDueDate = new Date(dueDate).setHours(0, 0, 0, 0);
        if (inputDueDate < currentDate) {
          return res
            .status(400)
            .json({ success: false, message: "Due date cannot be in the past" });
        }
    
        // Validate assignedTo user exists
        const assignedToUser = await User.findOne({aliasEmail:assignedTo});
  
        if (!assignedToUser) {
          return res
            .status(404)
            .json({ success: false, message: "Assigned user not found" });
        }
        const assignByUser = await User.findById(assignedBy);
        if (!assignByUser) {
          return res
            .status(404)
            .json({ success: false, message: "Assignee not found" });
        }
        // Create new task
        const newTask = new Task({
          title,
          description,
          priority,
          assignedTo:assignedToUser._id,
          assignedBy, 
          dueDate,
          assignDate:currentDate
        });
    
        // Save task to database
        const savedTask = await newTask.save();
    
        // Add task to assigned user's document
        assignedToUser.tasks = assignedToUser.tasks || [];
        assignedToUser.tasks.push(savedTask._id);
        await assignedToUser.save();
    
        return res
          .status(201)
          .json({ success: true, message: "Task assigned successfully", task: savedTask });
      } catch (error) {
        console.error("Error assigning task:", error);
        return res.status(500).json({ success: false, message: "Server error" });
      }
}