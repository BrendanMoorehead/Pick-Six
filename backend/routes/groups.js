//Group related api calls
import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import {
  createGroup,
  inviteToGroup,
  getInvites,
  acceptInvite,
} from '../controllers/groupController.js';
//Create a group: POST
//A user creates a group.
//authenticateUser protects this route
router.post('/create', authenticateUser, createGroup);
export default router;
//Invite a user: POST
//The group owner invites a user.
router.post('/invite', authenticateUser, inviteToGroup);
router.post('/accept', authenticateUser, acceptInvite);
router.get('/get_invites', authenticateUser, getInvites);
//Join a group: POST
//A user accepts an invite.

//Leave a group: DELETE
//A user leaves a group.

//Remove a user (owner only): DELETE
//The owner removes a user.

//Delete a group (owner only): DELETE
//The owner deletes the group.

//Get group details: GET
//Fetch group info and members.

//List user's groups: GET
//Fetch groups user is a part of.

//Submit a pick: POST
//A user submits a pick.

//List user picks: GET
//Fetch all picks for a user for a group.
