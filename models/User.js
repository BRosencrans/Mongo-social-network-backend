const {Schema, model} = require("mongoose");
//Template for the User model 
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //regex used to check for a valid email address 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email was entered incorrectly, please try again",]
    },
    echos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Echo"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Creates a virtual property "friendCount" that gets the amount of friends a user has 
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
//Initializes the User model
const User = model("User", userSchema);
module.exports = User;