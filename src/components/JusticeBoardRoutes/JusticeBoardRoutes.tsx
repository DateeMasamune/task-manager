import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../../constants';
import { AllBoards } from '../AllBoards';
import { Authorize } from '../Authorize';
import { JusticeBoard } from '../JusticeBoard';
import { JusticeDrawer } from '../JusticeDrawer';
import { Login } from '../Login';
import { Registration } from '../Registration';

const {
  MAIN, AllBOARDS, REGISTRATION, LOGIN,
} = routes;

export const JusticeBoardRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={MAIN}
        element={(
          <Authorize>
            <JusticeDrawer>
              <AllBoards />
            </JusticeDrawer>
          </Authorize>
        )}
      />
      <Route
        path={`${AllBOARDS}/:id`}
        element={(
          <Authorize>
            <JusticeDrawer>
              <JusticeBoard />
            </JusticeDrawer>
          </Authorize>
        )}
      />
      <Route
        path={REGISTRATION}
        element={(
          <Registration />
        )}
      />
      <Route
        path={LOGIN}
        element={(
          <Login />
        )}
      />
      <Route
        path="*"
        element={(
          <Authorize>
            <JusticeDrawer>
              <JusticeBoard />
            </JusticeDrawer>
          </Authorize>
        )}
      />
    </Routes>
  </BrowserRouter>
);
