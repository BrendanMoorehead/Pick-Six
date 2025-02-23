import { Tabs, Tab } from '@heroui/tabs';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
interface PickRateCardProps {
  //Add props as needed
  totalPicks: number;
  correctPicks: number;
  week: number;
}

const PickRateCard = (props: PickRateCardProps) => {
  return (
    <div className="max-w-xs">
      <Card>
        {/* <CardHeader></CardHeader> */}
        <CardBody>
          <div className="flex justify-between pr-4 py-2">
            <Tabs fullWidth isVertical>
              <Tab key="week" title={`Week ${props.week}`}></Tab>
              <Tab key="season" title="Season"></Tab>
            </Tabs>
            <div className="flex flex-col justify-end items-end">
              <p className="font-serif text-5xl font-bold">{`${props.correctPicks}/${props.totalPicks}`}</p>
              <p className="text-gray-500">correct</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PickRateCard;
