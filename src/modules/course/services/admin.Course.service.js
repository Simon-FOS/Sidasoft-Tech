import db from '../../../models/index.cjs';
import { getPublicIdFromUrl } from '../../../utils/utils.js';
import cloudinary from '../../../config/cloudinaryConfig.js';



export const findAll = async ({ limit, offset }) => {
  try {
    const { rows: courses, count: totalItems } = await db.Course.findAndCountAll({
      include: [{ model: db.Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } }],
      limit,
      offset,
      distinct: true,
      order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']],
    })
    return {
      courses,
      totalItems,
      totalPages: Math.ceil(totalItems / limit)
    };
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching records: ' + error.message);
  }
};

export const findById = async (id) => {
  try {
    const item = await db.Course.findByPk(id, {
      include: [{ model: db.Category, as: 'categories', attributes: ['id', 'name'], through: { attributes: [] } }]
    });
    if (!item) throw new Error('Not found');
    return item;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching record: ' + error.message);
  }
};

export const create = async (data) => {
  try {
    return await db.Course.create(data);
  } catch (error) {
    console.log(error)
    throw new Error('Error creating record: ' + error.message);
  }
};

export const update = async (id, data) => {
  try {
    console.log(data)
    const item = await db.Course.findByPk(id);
    if (!item) throw new Error('Not found');

    if (data.image_url === undefined || data.image_url === null || data.image_url === '') {
      data.image_url = item.image_url; // Remove image_url from data if it's 'undefined' or not provided
    }

    if (data.image_url && item.image_url && data.image_url !== item.image_url) {
      // If there's a new image_url and it's different from the existing one, delete the old image from Cloudinary
      const publicId = getPublicIdFromUrl(item.image_url);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log('Error deleting image from Cloudinary:', err);
        throw new Error('Error deleting old image from Cloudinary: ' + err.message);
      }
    }

    return await item.update(data);
  } catch (error) {
    console.log(error)
    throw new Error('Error updating record: ' + error.message);
  }
};

export const destroy = async (id) => {
  try {
    const item = await db.Course.findByPk(id);
    if (!item) throw new Error('Not found');

    // Delete the image from Cloudinary if it exists
    if (item.image_url) {
      const publicId = getPublicIdFromUrl(item.image_url);
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log('Error deleting image from Cloudinary:', err);
        throw new Error('Error deleting image from Cloudinary: ' + err.message);
      }
    }
    return await item.destroy();
  } catch (error) {
    console.log(error)
    throw new Error('Error deleting record: ' + error.message);
  }
};