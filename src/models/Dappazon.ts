/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace DappazonNamespace {
  export type ItemStruct = {
    id: BigNumberish;
    name: string;
    category: string;
    image: string;
    cost: BigNumberish;
    rating: BigNumberish;
    stock: BigNumberish;
  };

  export type ItemStructOutput = [
    id: bigint,
    name: string,
    category: string,
    image: string,
    cost: bigint,
    rating: bigint,
    stock: bigint
  ] & {
    id: bigint;
    name: string;
    category: string;
    image: string;
    cost: bigint;
    rating: bigint;
    stock: bigint;
  };
}

export interface DappazonInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "buy"
      | "items"
      | "list"
      | "name"
      | "orderCount"
      | "orders"
      | "owner"
      | "withdraw"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Buy" | "List"): EventFragment;

  encodeFunctionData(functionFragment: "buy", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "items", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "list",
    values: [
      BigNumberish,
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "orderCount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "orders",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "items", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "list", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "orderCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace BuyEvent {
  export type InputTuple = [
    buyer: AddressLike,
    orderId: BigNumberish,
    itemId: BigNumberish
  ];
  export type OutputTuple = [buyer: string, orderId: bigint, itemId: bigint];
  export interface OutputObject {
    buyer: string;
    orderId: bigint;
    itemId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ListEvent {
  export type InputTuple = [
    name: string,
    cost: BigNumberish,
    quantity: BigNumberish
  ];
  export type OutputTuple = [name: string, cost: bigint, quantity: bigint];
  export interface OutputObject {
    name: string;
    cost: bigint;
    quantity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Dappazon extends BaseContract {
  connect(runner?: ContractRunner | null): Dappazon;
  waitForDeployment(): Promise<this>;

  interface: DappazonInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  buy: TypedContractMethod<[_id: BigNumberish], [void], "payable">;

  items: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, string, bigint, bigint, bigint] & {
        id: bigint;
        name: string;
        category: string;
        image: string;
        cost: bigint;
        rating: bigint;
        stock: bigint;
      }
    ],
    "view"
  >;

  list: TypedContractMethod<
    [
      _id: BigNumberish,
      _name: string,
      _category: string,
      _image: string,
      _cost: BigNumberish,
      _rating: BigNumberish,
      _stock: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  name: TypedContractMethod<[], [string], "view">;

  orderCount: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  orders: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [bigint, DappazonNamespace.ItemStructOutput] & {
        time: bigint;
        item: DappazonNamespace.ItemStructOutput;
      }
    ],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buy"
  ): TypedContractMethod<[_id: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "items"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, string, bigint, bigint, bigint] & {
        id: bigint;
        name: string;
        category: string;
        image: string;
        cost: bigint;
        rating: bigint;
        stock: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "list"
  ): TypedContractMethod<
    [
      _id: BigNumberish,
      _name: string,
      _category: string,
      _image: string,
      _cost: BigNumberish,
      _rating: BigNumberish,
      _stock: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "orderCount"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "orders"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [bigint, DappazonNamespace.ItemStructOutput] & {
        time: bigint;
        item: DappazonNamespace.ItemStructOutput;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "Buy"
  ): TypedContractEvent<
    BuyEvent.InputTuple,
    BuyEvent.OutputTuple,
    BuyEvent.OutputObject
  >;
  getEvent(
    key: "List"
  ): TypedContractEvent<
    ListEvent.InputTuple,
    ListEvent.OutputTuple,
    ListEvent.OutputObject
  >;

  filters: {
    "Buy(address,uint256,uint256)": TypedContractEvent<
      BuyEvent.InputTuple,
      BuyEvent.OutputTuple,
      BuyEvent.OutputObject
    >;
    Buy: TypedContractEvent<
      BuyEvent.InputTuple,
      BuyEvent.OutputTuple,
      BuyEvent.OutputObject
    >;

    "List(string,uint256,uint256)": TypedContractEvent<
      ListEvent.InputTuple,
      ListEvent.OutputTuple,
      ListEvent.OutputObject
    >;
    List: TypedContractEvent<
      ListEvent.InputTuple,
      ListEvent.OutputTuple,
      ListEvent.OutputObject
    >;
  };
}