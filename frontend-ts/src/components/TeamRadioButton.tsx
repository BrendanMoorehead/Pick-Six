import { RadioGroup, Radio } from '@heroui/radio';
import { cn } from '@heroui/theme';
const TeamRadioButton = (props: any) => {
  const { children, teamColor, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          `data-[selected=true]:border-cardinals-${teamColor}`
        ),
        input: 'hidden',
      }}
    >
      {children}
    </Radio>
  );
};

export default TeamRadioButton;
