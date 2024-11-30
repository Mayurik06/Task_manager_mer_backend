import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: [true, 'Author is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });


  const Comment=mongoose.model('Comment',commentSchema)

  export default Comment;


