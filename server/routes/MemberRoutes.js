const express = require('express');
const { updateMember } = require('../controllers/MemberController');
const router = express.Router();
const memberController = require('../controllers/MemberController');

router.post('/', memberController.createMember);
router.get('/', memberController.getMember);
router.put('/:id', function(req, res) {
    memberController.updateMember(req, res);
  });  
router.delete('/:id', memberController.deleteMember);

module.exports = router