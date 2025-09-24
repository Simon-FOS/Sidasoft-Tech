import db from '../../../models/index.cjs';



export const findAll = async () => {
  try {
    return await db.User.findAll();
  } catch (error) {
    throw new Error('Error fetching records: ' + error.message);
  }
};

export const findById = async (id) => {
  try {
    const item = await db.User.findByPk(id);
    if (!item) throw new Error('Not found');
    return item;
  } catch (error) {
    throw new Error('Error fetching record: ' + error.message);
  }
};

export const update = async (id, data) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const item = await db.User.findByPk(id, { transaction });
    if (!item) {
      throw new Error('User not found');
    }

    const update_user = await item.update(data, { transaction });


    // Commit the transaction
    await transaction.commit();

    // Return the updated user with roles
    const updatedUser = await db.User.findByPk(id, {
      include: {
        model: db.Role,
        as: 'roles',
        through: { attributes: [] }
      }
    });
    return updatedUser;
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error updating user:', error);

    // Differentiate between not found and other errors
    if (error.message === 'User not found') {
      throw error; // Re-throw as is
    }
    throw new Error(`Error updating user: ${error.message}`);
  }
};