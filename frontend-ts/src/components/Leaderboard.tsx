import { selectGroups } from '@/features/groups/groupSlice';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/table';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
const Leaderboard = ({ id }: { id: string }) => {
  const groups = useSelector(selectGroups);
  const filteredMembers = useMemo(() => {
    return groups.filter((group) => Number(group.id) === Number(id));
  }, [groups, id]);
  console.log(filteredMembers);
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>RANK</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>CORRECT PICKS</TableColumn>
        <TableColumn>TOTAL PICKS</TableColumn>
      </TableHeader>
      <TableBody>
        {filteredMembers &&
          filteredMembers[0].members.map((member) => (
            <TableRow key={member.member_id}>
              <TableCell>1</TableCell>
              <TableCell>{member.username}</TableCell>
              <TableCell>10</TableCell>
              <TableCell>10</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default Leaderboard;
