import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Board = {
  __typename?: 'Board';
  columns: Array<Maybe<Column>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  rootUser: Scalars['String'];
  users: Array<Maybe<Scalars['String']>>;
};

export type BoardInput = {
  columns: Array<InputMaybe<ColumnInput>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  rootUser: Scalars['String'];
  users: Array<InputMaybe<Scalars['String']>>;
};

export type Column = {
  __typename?: 'Column';
  boardId: Scalars['String'];
  customId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  tasks: Array<Maybe<Task>>;
};

export type ColumnInput = {
  boardId: Scalars['String'];
  customId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  tasks: Array<InputMaybe<TaskInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserForBoard?: Maybe<Board>;
  createBoard?: Maybe<Board>;
  login?: Maybe<Token>;
  register?: Maybe<User>;
  removeBoard?: Maybe<Scalars['ID']>;
  updateBoard?: Maybe<Board>;
};


export type MutationAddUserForBoardArgs = {
  id: Scalars['ID'];
  users: Array<InputMaybe<Scalars['String']>>;
};


export type MutationCreateBoardArgs = {
  columns: Array<InputMaybe<ColumnInput>>;
  name: Scalars['String'];
  rootUser: Scalars['String'];
  users: Array<InputMaybe<Scalars['String']>>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveBoardArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateBoardArgs = {
  Board: BoardInput;
};

export type Query = {
  __typename?: 'Query';
  getAllBoard?: Maybe<Array<Maybe<Board>>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  socketAddUserForBoard?: Maybe<Board>;
  socketBoardCreate?: Maybe<Board>;
  socketBoardRemove?: Maybe<Scalars['ID']>;
  socketBoardUpdate?: Maybe<Board>;
};


export type SubscriptionSocketAddUserForBoardArgs = {
  rootUser: Scalars['ID'];
};


export type SubscriptionSocketBoardUpdateArgs = {
  rootUser: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  columnId: Scalars['String'];
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type TaskInput = {
  columnId: Scalars['String'];
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  User: User;
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Board: ResolverTypeWrapper<Board>;
  BoardInput: BoardInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Column: ResolverTypeWrapper<Column>;
  ColumnInput: ColumnInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Task: ResolverTypeWrapper<Task>;
  TaskInput: TaskInput;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Board: Board;
  BoardInput: BoardInput;
  Boolean: Scalars['Boolean'];
  Column: Column;
  ColumnInput: ColumnInput;
  ID: Scalars['ID'];
  JSON: Scalars['JSON'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Task: Task;
  TaskInput: TaskInput;
  Token: Token;
  User: User;
}>;

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = ResolversObject<{
  columns?: Resolver<Array<Maybe<ResolversTypes['Column']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rootUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Column'] = ResolversParentTypes['Column']> = ResolversObject<{
  boardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addUserForBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationAddUserForBoardArgs, 'id' | 'users'>>;
  createBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'columns' | 'name' | 'rootUser' | 'users'>>;
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'firstName' | 'lastName' | 'password'>>;
  removeBoard?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationRemoveBoardArgs, 'id'>>;
  updateBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'Board'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllBoard?: Resolver<Maybe<Array<Maybe<ResolversTypes['Board']>>>, ParentType, ContextType>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  socketAddUserForBoard?: SubscriptionResolver<Maybe<ResolversTypes['Board']>, "socketAddUserForBoard", ParentType, ContextType, RequireFields<SubscriptionSocketAddUserForBoardArgs, 'rootUser'>>;
  socketBoardCreate?: SubscriptionResolver<Maybe<ResolversTypes['Board']>, "socketBoardCreate", ParentType, ContextType>;
  socketBoardRemove?: SubscriptionResolver<Maybe<ResolversTypes['ID']>, "socketBoardRemove", ParentType, ContextType>;
  socketBoardUpdate?: SubscriptionResolver<Maybe<ResolversTypes['Board']>, "socketBoardUpdate", ParentType, ContextType, RequireFields<SubscriptionSocketBoardUpdateArgs, 'rootUser'>>;
}>;

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  columnId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Board?: BoardResolvers<ContextType>;
  Column?: ColumnResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

