import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  body: string[][],
  heading: string[]
}

const TransactionTable = ({ body, heading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            heading.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {body.map((items, index) => (
          <TableRow key={index}>
            {
              items.map((item, index) => (
                <TableCell key={index} className="font-medium">{item}</TableCell>
              ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
