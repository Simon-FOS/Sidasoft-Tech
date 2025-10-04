import * as service from '../services/admin.Course.service.js';

export const findAll = async (req, res) => {
  const { page, limit, offset } = req.pagination
  try {
    const data = await service.findAll({ limit, offset });
    res.status(200).render('./admins/course_list', {
      success: true,
      pageTitle: "Admin",
      courses: data.courses,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      currentPage: page
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};

export const findById = async (req, res) => {
  try {
    const data = await service.findById(req.params.id);
    res.status(200).render('./admins/course_update', {
      success: true,
      pageTitle: "Update Record",
      course: data,
    });
  } catch (err) {
    console.log(err)
    res.status(404).render('errors/404', { error: err });
  }
};

export const create = async (req, res) => {
  try {

    //get request files
    const files = req.files;
    if (files && files.length > 0) {
      // Assuming only one file is uploaded for image_url
      req.body.image_url = files[0].path; // or files[0].filename based on your storage setup

    }

    const data = await service.create(req.body);
    res.status(201).json({ success: true, message: 'Created successfully', data, redirectTo: '/admin/course' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await service.destroy(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const renderCreate = async (req, res) => {
  try {
    res.status(200).render('./admins/course_create', {
      pageTitle: "Create Course",
      layout: "admin"
    });
  } catch (err) {
    console.log(err)
    res.status(500).render('errors/500', { error: err });
  }
};