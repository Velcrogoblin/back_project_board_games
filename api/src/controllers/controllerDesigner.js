const {Designer} = require("../db");

const getAllDesigners = async (req, res) => {
    try {
      const designers = await Designer.findAll();
  
      if(designers.length === 0) {
       return res.status(404).json({ message: "There are no designers" })
      }
        return res.status(200).json(designers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


const postDesigner = async (req, res) => {
  const { designer_name } = req.body;
  try {
    if(!designer_name) {
       return res.status(400).json({ message: "There is missing information" });
    }
    
    const designer = await Designer.findOne({ where: { designer_name } });

    if (designer){
      return res.status(400).json({ message: `There is already a designer with the name ${designer_name}` })
    } else {
      await Designer.create({ designer_name })
      return res.status(201).json({ message: "Designer created successfuly" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
postDesigner,
getAllDesigners
};