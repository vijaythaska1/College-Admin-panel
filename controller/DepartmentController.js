import Model from "../Model/index.js";
import helper from "../utility/helper.js";

export default {

  departmentCreate: helper.AsyncHanddle(async (req, res) => {
    const data = await Model.DepartmentModel.create(req.body);
    helper.success(res, "Department Create Successfully", data);
  }),

  departmentFindAll: helper.AsyncHanddle(async (req, res) => {
    const data = await Model.DepartmentModel.find();
    helper.success(res, "Department Find Successfully", data);
  }),

  departmentFindById: helper.AsyncHanddle(async (req, res) => {
    const id = req.parmes.id;
    const data = await Model.DepartmentModel.findById(id);
    helper.success(res, "Department FindById Successfully", data);
  }),

  departmentUpdate: helper.AsyncHanddle(async (req, res) => {
    const id = req.parmes.id;
    const data = await Model.DepartmentModel.findByIdAndUpdate(id);
    helper.success(res, "Department FindById Successfully", data);
  }),

  departmentDelete: helper.AsyncHanddle(async (req, res) => {
    const id = req.parmes.id;
    const data = await Model.DepartmentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    helper.success(res, "Department FindById Successfully", data);
  }),
};
