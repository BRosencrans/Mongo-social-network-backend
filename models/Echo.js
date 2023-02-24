const {Schema, model, Types} = require("mongoose");
//Template for the Subdocument  EchoEcho(post responses)
const echoEchoSchema = new Schema(
    {
    echoEchoId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    echoEchoText: {
        type: String,
        required: true,
        maxlength: 150,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

// Template for the Echo(post) model
const EchoSchema = new Schema(
    {
      echoText: {
        type: String,
        required: true,
        maxlength: 300,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
      echoEcho: [echoEchoSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );


//  Creates a virtual property "echoEchoEcho" that gets the amount of responses an echo (post)has
EchoSchema.virtual("echoEchoEcho").get(function () {
    return this.echoEcho.length;
  });
  //Initializes the Echo(post)model
  const Echo = model("Echo", EchoSchema);
  
  module.exports = Echo;