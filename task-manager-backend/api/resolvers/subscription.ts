import { withFilter } from 'graphql-subscriptions';
import { Board, SubscriptionSocketAddUserForBoardArgs, SubscriptionSocketBoardUpdateArgs } from '../../resolvers-types';
import { Models } from '../modeles/types';
import { SubscriptionsConst } from '../subscriptions-const';

interface SubscriptionResponse {
  [key: string]: Board
}

const {
  BOARD_UPDATE, BOARD_REMOVE, BOARD_CREATE, ADD_USER_FOR_BOARD,
} = SubscriptionsConst;

export const Subscription = {
  socketAddUserForBoard: {
    subscribe: withFilter(
      (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(ADD_USER_FOR_BOARD),
      (
        payload: SubscriptionResponse,
        { rootUser }: SubscriptionSocketAddUserForBoardArgs,
      ) => {
        const { users } = payload.socketAddUserForBoard;

        return users.includes(rootUser);
      },
    ),
  },
  socketBoardUpdate: {
    subscribe: withFilter(
      (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_UPDATE),
      (
        payload: SubscriptionResponse,
        { rootUser }: SubscriptionSocketBoardUpdateArgs,
      ) => {
        const { users, rootUser: payloadRootUser } = payload.socketBoardUpdate;

        return users.includes(rootUser) || rootUser === payloadRootUser;
      },
    ),
  },
  socketBoardRemove: {
    subscribe: (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_REMOVE),
  },
  socketBoardCreate: {
    subscribe: (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_CREATE),
  },
};
