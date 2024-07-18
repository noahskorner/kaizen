import { useEffect, useRef, useState } from 'react';
import { Button, ButtonProps, InputErrors } from '..';
import './button-group.css';
import { ApiError } from '@kaizen/core';

export interface ButtonGroupProps {
  multi?: boolean;
  buttons: Array<ButtonProps & { value: string }>;
  errors?: ApiError[];
  description?: string;
  onChange: (values: string[]) => void;
}

export const ButtonGroup = ({
  multi = false,
  buttons,
  errors = [],
  description,
  onChange
}: ButtonGroupProps) => {
  const prevRef = useRef<string[] | null>(null);
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const onButtonClick = (selectedValue: string) => {
    setSelectedButtons((prev) => {
      return multi ? [...prev, selectedValue] : [selectedValue];
    });
  };

  useEffect(() => {
    if (prevRef.current !== null && prevRef.current !== selectedButtons) {
      onChange(selectedButtons);
    }

    prevRef.current = selectedButtons;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedButtons]);

  return (
    <div className="flex flex-col gap-y-2 text-sm">
      <label className="font-semibold">Donation Frequency</label>
      {description && <p className="text-xs text-zinc-700">{description}</p>}
      <div
        className={`${
          errors.length > 0 && 'ring-1 ring-red-600'
        } button-group flex w-full rounded-lg `}>
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
      <InputErrors errors={errors} />
    </div>
  );
};
