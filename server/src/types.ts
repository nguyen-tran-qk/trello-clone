import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Board = {
   __typename?: 'Board';
  _id: Scalars['ID'];
  title: Scalars['String'];
  team: Array<Team>;
  background?: Maybe<Scalars['String']>;
  _created: Scalars['DateTime'];
  _changed: Scalars['DateTime'];
};

export type Card = {
   __typename?: 'Card';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};


export type List = {
   __typename?: 'List';
  _id: Scalars['ID'];
  title: Scalars['String'];
  board_id: Scalars['ID'];
  cards: Array<Maybe<Card>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createBoardByMembers: Board;
  createBoardByTeam: Board;
  createTeam: Team;
};


export type MutationCreateBoardByMembersArgs = {
  title: Scalars['String'];
  members: Array<Scalars['ID']>;
};


export type MutationCreateBoardByTeamArgs = {
  title: Scalars['String'];
  team: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  members: Array<Scalars['ID']>;
};

export type Query = {
   __typename?: 'Query';
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
  boards: Array<Maybe<Board>>;
  teams: Array<Team>;
};


export type QueryUsersArgs = {
  keyword?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Team = TeamWithMemberObj | TeamWithMemberId;

export type TeamWithMemberId = {
   __typename?: 'TeamWithMemberID';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members: Array<Scalars['ID']>;
  personal?: Maybe<Scalars['Boolean']>;
};

export type TeamWithMemberObj = {
   __typename?: 'TeamWithMemberObj';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members: Array<User>;
  personal?: Maybe<Scalars['Boolean']>;
};

export type User = {
   __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  avatar: Array<Maybe<Scalars['String']>>;
  _created: Scalars['DateTime'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Board: ResolverTypeWrapper<Omit<Board, 'team'> & { team: Array<ResolversTypes['Team']> }>,
  Team: ResolversTypes['TeamWithMemberObj'] | ResolversTypes['TeamWithMemberID'],
  TeamWithMemberObj: ResolverTypeWrapper<TeamWithMemberObj>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  TeamWithMemberID: ResolverTypeWrapper<TeamWithMemberId>,
  Mutation: ResolverTypeWrapper<{}>,
  List: ResolverTypeWrapper<List>,
  Card: ResolverTypeWrapper<Card>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  User: User,
  ID: Scalars['ID'],
  DateTime: Scalars['DateTime'],
  Board: Omit<Board, 'team'> & { team: Array<ResolversParentTypes['Team']> },
  Team: ResolversParentTypes['TeamWithMemberObj'] | ResolversParentTypes['TeamWithMemberID'],
  TeamWithMemberObj: TeamWithMemberObj,
  Boolean: Scalars['Boolean'],
  TeamWithMemberID: TeamWithMemberId,
  Mutation: {},
  List: List,
  Card: Card,
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  team?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>,
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  _changed?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  board_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  cards?: Resolver<Array<Maybe<ResolversTypes['Card']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBoardByMembers?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardByMembersArgs, 'title' | 'members'>>,
  createBoardByTeam?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardByTeamArgs, 'title' | 'team'>>,
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'name' | 'members'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  boards?: Resolver<Array<Maybe<ResolversTypes['Board']>>, ParentType, ContextType>,
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>,
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  __resolveType: TypeResolveFn<'TeamWithMemberObj' | 'TeamWithMemberID', ParentType, ContextType>
};

export type TeamWithMemberIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamWithMemberID'] = ResolversParentTypes['TeamWithMemberID']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>,
  personal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TeamWithMemberObjResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamWithMemberObj'] = ResolversParentTypes['TeamWithMemberObj']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  personal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  avatar?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>,
  _created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>,
  Card?: CardResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  List?: ListResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Team?: TeamResolvers,
  TeamWithMemberID?: TeamWithMemberIdResolvers<ContextType>,
  TeamWithMemberObj?: TeamWithMemberObjResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
