import React, { ChangeEvent, FC, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ChangeNameProps {
  prevName: string
  // eslint-disable-next-line no-unused-vars
  sendChanges: (name: string) => void
  hideChangeName: () => void
  className?: string
}

export const ChangeName: FC<ChangeNameProps> = ({
  prevName, sendChanges, hideChangeName, className,
}) => {
  const [name, setName] = useState(prevName);

  const handleChangeNameColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  return (
    <Box className={className}>
      <TextField value={name} onChange={handleChangeNameColumn} />
      <Box>
        <Button onClick={() => sendChanges(name)}>Принять</Button>
        <Button onClick={hideChangeName}>Отмена</Button>
      </Box>
    </Box>
  );
};

ChangeName.defaultProps = {
  className: '',
};
