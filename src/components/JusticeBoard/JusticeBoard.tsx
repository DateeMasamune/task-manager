import React, { FC } from 'react';

interface JusticeBoardProps {
  data?: any
}

export const JusticeBoard: FC<JusticeBoardProps> = () => (
  <div>
    {[{ id: 1 }, { id: 1 }, { id: 1 }].map(({ id }) => <div>{id}</div>)}
  </div>
);
