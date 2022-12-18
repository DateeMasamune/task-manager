import { withFilter } from 'graphql-subscriptions';
import { Board, SubscriptionSocketAddUserForBoardArgs } from '../../resolvers-types';
import { Models } from '../modeles/types';
import { SubscriptionsConst } from '../subscriptions-const';

interface AddUserForBoardResponse {
  socketAddUserForBoard: Board
}

const {
  BOARD_UPDATE, BOARD_REMOVE, BOARD_CREATE, ADD_USER_FOR_BOARD,
} = SubscriptionsConst;

export const Subscription = {
  socketAddUserForBoard: {
    subscribe: withFilter(
      (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(ADD_USER_FOR_BOARD),
      async (
        payload: AddUserForBoardResponse,
        { rootUser }: SubscriptionSocketAddUserForBoardArgs,
      ) => {
        const { users } = payload.socketAddUserForBoard;

        return users.includes(rootUser);
      },
    ),
  },
  socketBoardUpdate: {
    subscribe: (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_UPDATE),
  },
  socketBoardRemove: {
    subscribe: (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_REMOVE),
  },
  socketBoardCreate: {
    subscribe: (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_CREATE),
  },
};
