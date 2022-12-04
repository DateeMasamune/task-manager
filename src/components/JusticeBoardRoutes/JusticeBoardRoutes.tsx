import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../../constants';
import { AllBoards } from '../AllBoards';
import { JusticeBoard } from '../JusticeBoard';
import { JusticeDrawer } from '../JusticeDrawer';

const { MAIN, AllBOARDS } = routes;

export const JusticeBoardRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={MAIN}
        element={(
          <JusticeDrawer>
            <AllBoards />
          </JusticeDrawer>
        )}
      />
      <Route
        path={`${AllBOARDS}/:id`}
        element={(
          <JusticeDrawer>
            <JusticeBoard />
          </JusticeDrawer>
        )}
      />
    </Routes>
  </BrowserRouter>
);
