import Model from "../Model/index.js";
import helper from "../utility/helper.js";

export default {
  cmsCreate: helper.AsyncHanddle(async (req, res) => {
    const { type, content, tittel } = req.body;
    const data = await Model.CmsModel.create({ type, content, tittel });
    helper.success(res, "cms create successfully", data);
  }),
  CmsGet: helper.AsyncHanddle(async (req, res) => {
    const type = req.query.type;
    const data = await Model.CmsModel.findOne({ type });
    helper.success(res, "Cms Get Successfully", data);
  }),

  CmsUpdate: helper.AsyncHanddle(async (req, res) => {
    const { content } = req.body;
    const type = req.query.type;
    const data = await Model.CmsModel.updateOne(
      { type },
      { content },
      { new: true }
    );
    helper.success(res, "Cms Upate Successfully", data);
  }),
};
