import mongoose from 'mongoose'

/**
 * Mongoose schema to represent a chat.
 */
const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  messages: [{
    message: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: false
    }
  }],
  hasArchive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;