import mongoose from "mongoose";

const connect = (uri, cb) => {
  mongoose
    .connect(uri)
    .then(() => cb("Database mongoDB connected."))
    .catch((err) => console.log(err));
};

export default { connect };
