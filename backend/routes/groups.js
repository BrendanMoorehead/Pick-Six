//Group related api calls
import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import {
  createGroup,
  inviteToGroup,
  getInvites,
  acceptInvite,
  declineInvite,
  deleteGroup,
  removeUser,
} from '../controllers/groupController.js';

//A user creates a group.
router.post('/create', authenticateUser, createGroup);
//The group owner invites a user.
router.post('/invite', authenticateUser, inviteToGroup);
//The invited user accepts.
router.post('/accept', authenticateUser, acceptInvite);
//The invited user declines.
router.post('/decline', authenticateUser, declineInvite);
//Get all invites for a given user.
router.get('/get_invites', authenticateUser, getInvites);
//Group owner deletes a group.
router.delete('/delete', authenticateUser, deleteGroup);
//Leave a group: DELETE
//A user leaves a group.
router.delete('/remove_user', authenticateUser, removeUser);
//Remove a user (owner only): DELETE
//The owner removes a user.

//Get group details: GET
//Fetch group info and members.

//List user's groups: GET
//Fetch groups user is a part of.

//Submit a pick: POST
//A user submits a pick.

//List user picks: GET
//Fetch all picks for a user for a group.
export default router;
