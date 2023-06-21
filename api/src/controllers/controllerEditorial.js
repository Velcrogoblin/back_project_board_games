const {Editorial }= require("../db");

const postEditorial = async (req, res) => {
    const { editorial_name } = req.body;
 
    
    if (!editorial_name) {
      return res.status(400).json({message: "Name is required"});
    }
    
    const existingEditorial = await Editorial.findOne({where: { editorial_name: editorial_name }});
    
   if(existingEditorial){
    return res.status(406).json({ message: `Editorial with name ${editorial_name} already exists` });
   } 

    try {
     await Editorial.create({
      editorial_name: editorial_name
     });
 
     return res.status(201).json({message: "Editorial successfuly created"});
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
 };

 const getAllEditorials = async (req, res) => {
    try {
      const allEditorials = await Editorial.findAll();
      if (allEditorials.length === 0) {
        return res.status(404).json({ message: "No editorials were found" });
      }
      return res.status(200).json(allEditorials);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

 module.exports = {
    postEditorial,
    getAllEditorials
 }