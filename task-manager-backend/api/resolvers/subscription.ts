// import { withFilter } from 'graphql-subscriptions';
import { Models } from '../modeles/types';
import { SubscriptionsConst } from '../subscriptions-const';

const { BOARD_UPDATE, BOARD_REMOVE, BOARD_CREATE } = SubscriptionsConst;

export const Subscription = {
  // boardUpdate: {
  //   subscribe: withFilter(
  //     (_parent: any, _arg: any, { pubsub }: Models) => pubsub.asyncIterator(BOARD_UPDATE),
  //     (
  //       { messageAdded }: MessageAddedProps,
  //       { roomId }: MessageAddedProps,
  //     ) => messageAdded.roomId === roomId,
  //   ),
  // },
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
