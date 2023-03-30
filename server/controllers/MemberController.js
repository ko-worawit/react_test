const Member = require('../models/Member');

module.exports = {
    async createMember(req, res) {
        try {
            const {name, age, role} = req.body;
            const member = await Member.create({name, age, role});
            res.json({ member});
        } catch (error){
            console.error(error);
            res.status(500).json({message: 'Create error '});
        }
    },

    async getMember(req, res) {
        try {
            const members = await Member.findAll();
            res.json({ members });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Fetch error'});
        }
    },

    async updateMember(req, res) {
        try {
            const { id } = req.params;
            const { name, age, role } = req.body;
            const member = await Member.findByPk(id);
            if (!member){
                return res.status(404).json({message: 'Member not found'});
            }
            member.name = name || member.name;
            member.age = age || member.age;
            member.role = role || member.role;
            await member.save();
            res.json({ member});
        } catch(error) {
            console.error(error);
            res.status(500).json({message: 'Update error'});
        }
    },

    async deleteMember(req, res) {
        try{
            const { id } = req.params;
            const member = await Member.findByPk(id);
            if (!member){
                return res.status(404).json({message: 'Member not found'});
            }
            await member.destroy();
            res.json({ message: "Member deleted"});
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Delete error' });
        }
    }
};