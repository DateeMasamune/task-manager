// import { withFilter } from 'graphql-subscriptions';
// import { SubscriptionsConst } from '../subscriptions-const';

// const { BOARD_UPDATE } = SubscriptionsConst;

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
};
