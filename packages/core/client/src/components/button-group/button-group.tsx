import { useEffect, useState } from 'react';
import { Button, ButtonProps } from '..';
import './button-group.css';

export interface ButtonGroupProps {
  multi?: boolean;
  buttons: Array<ButtonProps & { value: string }>;
  description?: string;
  onChange: (values: string[]) => void;
}

export const ButtonGroup = ({
  multi = false,
  buttons,
  description,
  onChange
}: ButtonGroupProps) => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const onButtonClick = (selectedValue: string) => {
    setSelectedButtons((prev) => {
      return multi ? [...prev, selectedValue] : [selectedValue];
    });
  };

  useEffect(() => {
    onChange(selectedButtons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedButtons]);

  return (
    <div className="flex flex-col gap-y-2 text-sm">
      <label className="font-semibold">Donation Frequency</label>
      <div className="button-group flex w-full">
        {buttons.map((button) => {
          return (
            <Button
              key={button.value}
              {...button}
              className="w-full"
              onClick={() => onButtonClick(button.value)}
              active={selectedButtons.includes(button.value)}
            />
          );
        })}
      </div>
      {description && <p className="text-xs text-neutral-700">{description}</p>}
    </div>
  );
};
