import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";

const Leaderboard = () => {
  return  (<Table aria-label="Example static collection table">
  <TableHeader>
  <TableColumn>RANK</TableColumn>
    <TableColumn>NAME</TableColumn>
    <TableColumn>CORRECT PICKS</TableColumn>
    <TableColumn>TOTAL PICKS</TableColumn>
  </TableHeader>
  <TableBody>
    <TableRow key="1">
      <TableCell>1</TableCell>
      <TableCell>Tony Reichert</TableCell>
      <TableCell>10</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="2">
      <TableCell>2</TableCell>
      <TableCell>Zoey Lang</TableCell>
      <TableCell>9</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="3">
      <TableCell>3</TableCell>
      <TableCell>Jane Fisher</TableCell>
      <TableCell>8</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="4">
      <TableCell>4</TableCell>
      <TableCell>William Howard</TableCell>
      <TableCell>7</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="5">
      <TableCell>5</TableCell>
      <TableCell>William Howard</TableCell>
      <TableCell>6</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="6">
      <TableCell>6</TableCell>
      <TableCell>William Howard</TableCell>
      <TableCell>5</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="7">
      <TableCell>7</TableCell>
      <TableCell>William Howard</TableCell>
      <TableCell>4</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow key="8">
      <TableCell>8</TableCell>
      <TableCell>William Howard</TableCell>
      <TableCell>3</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
      </TableBody>
    </Table>
  );
};

export default Leaderboard;
