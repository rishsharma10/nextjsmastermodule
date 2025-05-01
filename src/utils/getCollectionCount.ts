import mongoose from 'mongoose';

/**
 * Get the count of documents in a given Mongoose model.
 * @param model - The Mongoose model to count documents for.
 * @param filter - Optional filter to count a subset of documents.
 * @returns The total document count (number).
 */
export async function getCollectionCount(
  model: mongoose.Model<any>,
  filter: Record<string, any> = {}
): Promise<number> {
  try {
    const count = await model.countDocuments(filter);
    return count;
  } catch (error) {
    console.error('Error getting document count:', error);
    throw new Error('Failed to get collection count');
  }
}
