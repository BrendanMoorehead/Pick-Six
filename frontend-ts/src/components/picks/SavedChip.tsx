import { useSelector } from 'react-redux';
import { picksLoading } from '@/features/picks/pickSlice';
const SavedChip = ({
  pickCount,
  gameCount,
}: {
  pickCount: number;
  gameCount: number;
}) => {
  const isPicksLoading = useSelector(picksLoading);
  return (
    <div className="flex">
      <p className="text-gray-500 text-sm bg-gray-100 p-2 rounded-lg">
        {isPicksLoading ? 'saving...' : `${pickCount}/${gameCount} picks saved`}
      </p>
    </div>
  );
};

export default SavedChip;
