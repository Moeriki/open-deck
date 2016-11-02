import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const Mixed = mongoose.Schema.Types.Mixed;

export const ObjectId = mongoose.Schema.Types.ObjectId;

export default (name, schemaDefinition) => {
  try {
    mongoose.model(name);
  } catch (_) {
    mongoose.model(name, new mongoose.Schema(schemaDefinition, {
      _id: true,        // enable ObjectId identifier
      id: true,         // create virtual id property returning _id value
      timestamps: true, // add createdAt / updatedAt
      typeKey: '$type',
    }));
  }
};
