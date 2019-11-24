const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WaitlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true
    },
    referral: {
      type: Schema.Types.ObjectId
    },
    waitlistPosition: {
      type: Number,
      default: 0
    },
    refers: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Waitlist = mongoose.model("Waitlist", WaitlistSchema);

module.exports = Waitlist;
