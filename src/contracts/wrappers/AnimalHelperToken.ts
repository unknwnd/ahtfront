import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    tokenRate: bigint;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        b_0.storeInt(src.tokenRate, 257);
    };
}

export function loadJettonData(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _walletCode = sc_0.loadRef();
    const _tokenRate = sc_0.loadIntBig(257);
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}

function loadTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}

function loadGetterTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}

function storeTupleJettonData(source: JettonData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    builder.writeNumber(source.tokenRate);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type GetWalletAddress = {
    $$type: 'GetWalletAddress';
    owner_address: Address;
}

export function storeGetWalletAddress(src: GetWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3316846856, 32);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadGetWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3316846856) { throw Error('Invalid prefix'); }
    const _owner_address = sc_0.loadAddress();
    return { $$type: 'GetWalletAddress' as const, owner_address: _owner_address };
}

function loadTupleGetWalletAddress(source: TupleReader) {
    const _owner_address = source.readAddress();
    return { $$type: 'GetWalletAddress' as const, owner_address: _owner_address };
}

function loadGetterTupleGetWalletAddress(source: TupleReader) {
    const _owner_address = source.readAddress();
    return { $$type: 'GetWalletAddress' as const, owner_address: _owner_address };
}

function storeTupleGetWalletAddress(source: GetWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserGetWalletAddress(): DictionaryValue<GetWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadGetWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type UpdateDistributionContractMessage = {
    $$type: 'UpdateDistributionContractMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateDistributionContractMessage(src: UpdateDistributionContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3597658823, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateDistributionContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3597658823) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateDistributionContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateDistributionContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateDistributionContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateDistributionContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateDistributionContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateDistributionContractMessage(source: UpdateDistributionContractMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateDistributionContractMessage(): DictionaryValue<UpdateDistributionContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateDistributionContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateDistributionContractMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateNFTContractMessage = {
    $$type: 'UpdateNFTContractMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateNFTContractMessage(src: UpdateNFTContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2320696427, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateNFTContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2320696427) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateNFTContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateNFTContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateNFTContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateNFTContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateNFTContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateNFTContractMessage(source: UpdateNFTContractMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateNFTContractMessage(): DictionaryValue<UpdateNFTContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateNFTContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateNFTContractMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateContentMessage = {
    $$type: 'UpdateContentMessage';
    queryId: bigint;
    new_content: Cell;
}

export function storeUpdateContentMessage(src: UpdateContentMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1419921888, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeRef(src.new_content);
    };
}

export function loadUpdateContentMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1419921888) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_content = sc_0.loadRef();
    return { $$type: 'UpdateContentMessage' as const, queryId: _queryId, new_content: _new_content };
}

function loadTupleUpdateContentMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage' as const, queryId: _queryId, new_content: _new_content };
}

function loadGetterTupleUpdateContentMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage' as const, queryId: _queryId, new_content: _new_content };
}

function storeTupleUpdateContentMessage(source: UpdateContentMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.new_content);
    return builder.build();
}

function dictValueParserUpdateContentMessage(): DictionaryValue<UpdateContentMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateContentMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateContentMessage(src.loadRef().beginParse());
        }
    }
}

export type BuyTokensMessage = {
    $$type: 'BuyTokensMessage';
    queryId: bigint;
}

export function storeBuyTokensMessage(src: BuyTokensMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3668904916, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadBuyTokensMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3668904916) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'BuyTokensMessage' as const, queryId: _queryId };
}

function loadTupleBuyTokensMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'BuyTokensMessage' as const, queryId: _queryId };
}

function loadGetterTupleBuyTokensMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'BuyTokensMessage' as const, queryId: _queryId };
}

function storeTupleBuyTokensMessage(source: BuyTokensMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserBuyTokensMessage(): DictionaryValue<BuyTokensMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyTokensMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBuyTokensMessage(src.loadRef().beginParse());
        }
    }
}

export type ToggleMintingMessage = {
    $$type: 'ToggleMintingMessage';
    queryId: bigint;
}

export function storeToggleMintingMessage(src: ToggleMintingMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1849045995, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadToggleMintingMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1849045995) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'ToggleMintingMessage' as const, queryId: _queryId };
}

function loadTupleToggleMintingMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ToggleMintingMessage' as const, queryId: _queryId };
}

function loadGetterTupleToggleMintingMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ToggleMintingMessage' as const, queryId: _queryId };
}

function storeTupleToggleMintingMessage(source: ToggleMintingMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserToggleMintingMessage(): DictionaryValue<ToggleMintingMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeToggleMintingMessage(src)).endCell());
        },
        parse: (src) => {
            return loadToggleMintingMessage(src.loadRef().beginParse());
        }
    }
}

export type EmergencyWithdrawMessage = {
    $$type: 'EmergencyWithdrawMessage';
    queryId: bigint;
}

export function storeEmergencyWithdrawMessage(src: EmergencyWithdrawMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3855890798, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadEmergencyWithdrawMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3855890798) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'EmergencyWithdrawMessage' as const, queryId: _queryId };
}

function loadTupleEmergencyWithdrawMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'EmergencyWithdrawMessage' as const, queryId: _queryId };
}

function loadGetterTupleEmergencyWithdrawMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'EmergencyWithdrawMessage' as const, queryId: _queryId };
}

function storeTupleEmergencyWithdrawMessage(source: EmergencyWithdrawMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserEmergencyWithdrawMessage(): DictionaryValue<EmergencyWithdrawMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmergencyWithdrawMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyWithdrawMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateTokenRateMessage = {
    $$type: 'UpdateTokenRateMessage';
    queryId: bigint;
    new_rate: bigint;
}

export function storeUpdateTokenRateMessage(src: UpdateTokenRateMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1372787303, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.new_rate, 257);
    };
}

export function loadUpdateTokenRateMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1372787303) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_rate = sc_0.loadIntBig(257);
    return { $$type: 'UpdateTokenRateMessage' as const, queryId: _queryId, new_rate: _new_rate };
}

function loadTupleUpdateTokenRateMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_rate = source.readBigNumber();
    return { $$type: 'UpdateTokenRateMessage' as const, queryId: _queryId, new_rate: _new_rate };
}

function loadGetterTupleUpdateTokenRateMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_rate = source.readBigNumber();
    return { $$type: 'UpdateTokenRateMessage' as const, queryId: _queryId, new_rate: _new_rate };
}

function storeTupleUpdateTokenRateMessage(source: UpdateTokenRateMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.new_rate);
    return builder.build();
}

function dictValueParserUpdateTokenRateMessage(): DictionaryValue<UpdateTokenRateMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateTokenRateMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenRateMessage(src.loadRef().beginParse());
        }
    }
}

export type AdminParams = {
    $$type: 'AdminParams';
    tempAdmin: Address | null;
    recoveryAddress: Address;
    lockUntil: bigint;
}

export function storeAdminParams(src: AdminParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.tempAdmin);
        b_0.storeAddress(src.recoveryAddress);
        b_0.storeInt(src.lockUntil, 257);
    };
}

export function loadAdminParams(slice: Slice) {
    const sc_0 = slice;
    const _tempAdmin = sc_0.loadMaybeAddress();
    const _recoveryAddress = sc_0.loadAddress();
    const _lockUntil = sc_0.loadIntBig(257);
    return { $$type: 'AdminParams' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}

function loadTupleAdminParams(source: TupleReader) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    return { $$type: 'AdminParams' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}

function loadGetterTupleAdminParams(source: TupleReader) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    return { $$type: 'AdminParams' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}

function storeTupleAdminParams(source: AdminParams) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.tempAdmin);
    builder.writeAddress(source.recoveryAddress);
    builder.writeNumber(source.lockUntil);
    return builder.build();
}

function dictValueParserAdminParams(): DictionaryValue<AdminParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAdminParams(src)).endCell());
        },
        parse: (src) => {
            return loadAdminParams(src.loadRef().beginParse());
        }
    }
}

export type AnimalHelperToken$Data = {
    $$type: 'AnimalHelperToken$Data';
    totalSupply: bigint;
    maxSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    distributionContract: Address;
    nftContract: Address;
    tokenRate: bigint;
    adminParams: AdminParams;
}

export function storeAnimalHelperToken$Data(src: AnimalHelperToken$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeInt(src.maxSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        const b_1 = new Builder();
        b_1.storeAddress(src.distributionContract);
        b_1.storeAddress(src.nftContract);
        b_1.storeInt(src.tokenRate, 257);
        const b_2 = new Builder();
        b_2.store(storeAdminParams(src.adminParams));
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAnimalHelperToken$Data(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _maxSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _walletCode = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _distributionContract = sc_1.loadAddress();
    const _nftContract = sc_1.loadAddress();
    const _tokenRate = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _adminParams = loadAdminParams(sc_2);
    return { $$type: 'AnimalHelperToken$Data' as const, totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, distributionContract: _distributionContract, nftContract: _nftContract, tokenRate: _tokenRate, adminParams: _adminParams };
}

function loadTupleAnimalHelperToken$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _maxSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _distributionContract = source.readAddress();
    const _nftContract = source.readAddress();
    const _tokenRate = source.readBigNumber();
    const _adminParams = loadTupleAdminParams(source);
    return { $$type: 'AnimalHelperToken$Data' as const, totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, distributionContract: _distributionContract, nftContract: _nftContract, tokenRate: _tokenRate, adminParams: _adminParams };
}

function loadGetterTupleAnimalHelperToken$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _maxSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _distributionContract = source.readAddress();
    const _nftContract = source.readAddress();
    const _tokenRate = source.readBigNumber();
    const _adminParams = loadGetterTupleAdminParams(source);
    return { $$type: 'AnimalHelperToken$Data' as const, totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, distributionContract: _distributionContract, nftContract: _nftContract, tokenRate: _tokenRate, adminParams: _adminParams };
}

function storeTupleAnimalHelperToken$Data(source: AnimalHelperToken$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.maxSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    builder.writeAddress(source.distributionContract);
    builder.writeAddress(source.nftContract);
    builder.writeNumber(source.tokenRate);
    builder.writeTuple(storeTupleAdminParams(source.adminParams));
    return builder.build();
}

function dictValueParserAnimalHelperToken$Data(): DictionaryValue<AnimalHelperToken$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAnimalHelperToken$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperToken$Data(src.loadRef().beginParse());
        }
    }
}

 type AnimalHelperToken_init_args = {
    $$type: 'AnimalHelperToken_init_args';
    owner: Address;
    distributionContract: Address;
    nftContract: Address;
    content: Cell;
    walletCode: Cell;
}

function initAnimalHelperToken_init_args(src: AnimalHelperToken_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.distributionContract);
        b_0.storeAddress(src.nftContract);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
    };
}

async function AnimalHelperToken_init(owner: Address, distributionContract: Address, nftContract: Address, content: Cell, walletCode: Cell) {
    const __code = Cell.fromHex('b5ee9c7241022201000a1e000228ff008e88f4a413f4bcf2c80bed5320e303ed43d901030279a651477b5134348000638afe903e903e903535155001745540dc2088e35fa931a0001fe08061a80a1b550429441ac4168412441a0419f8c376cf1b3060040200022803c230eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e2bfa40fa40fa40d4d4554005d155037082238d7ea4c680007f820186a0286d5410a5106b105a104910681067e30d0d925f0de02bd749c21fe3000bf9012004051a008e810101d700810101d700d200fa40d4d401d0d4fa40fa40810101d700d430d020d70b01c30093fa40019472d7216de201fa40810101d700552033107c107b107a10791078586c1c04fc0bd31f218210daaf0bd4bae3022182106e3633ebba8edb5b109b5518db3c09b309c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54db31e0218210d66feac7bae3022106130c0d03f431810101d70001318200d52629f2f4820afaf080f8416f24135f037aa904b608f8416f24135f0321a18200ca2a21c200f2f410bc10ac109c108c107c106c105c104c103c4cde2edb3c811a6d53d1a02dbbf2f4f84210cd10bd10ad1d191817161514433053dedb3c7f71c8561001cb3ff842cf16c9280411135907080a001424a882103b9aca00a90402f451e1a08139cc531ebbf2f455b1db3c7f8209c9c3807170c88210178d451901cb1f01111301cb3f011111fa02f828cf16f828cf1670fa0201111101ca00c94430021110021f146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c90117090008fb0055190292146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb002b820186a0be95102d3b3b30e30d107b55360b1900ae0b820186a0a9047f71c85210cb1f1fcb3ff842cf1612cb1fc92443144fee146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00109a01fe31810101d700fa40596c2110ab109a108910781067105610451034413cdb3c3510ab109a10891078106710565503c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54db3113044a82108a53046bbae30221821054a249e0bae30221821051d31267bae302218210e5d4396eba0e10111202fe31810101d700fa40596c2110ab109a108910781067105610451034413cdb3c3410ab109a108910781067105610455502c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54130f0004db3101f431810101d700d4596c2110ab109a108910781067105610451034413cdb3c3710ab109a108910785505c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54db3113027a31810101d700810101d700596c2110ab109a108910781067105610451034413cdb3c338200f8192cc200f2f410ab109a10891078106710561045103458131904b68f465b109b5518db3cf8427070810081036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e0218210946a98b6bae302018210c5b31108ba131914160052817ba3f82322bcf2f4f8425290c705236eb39e917f9a22206ef2d080f842c705e2de8200a5c301f2f401fc31d33f0131c8018210aff90f5758cb1fcb3fc910ac109b108a10791068105710461035443012f84201706ddb3cc87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54db311500a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c08f5cfa40013110ac109b108a10791068105710461035443012db3cf842708042c85004cf16c941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e00b1719015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0180016c8f828cf1601cf16c9527000a2c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54db3104e282f0433c5cbf3a412203a138815cca7fccea8573317c174bf1efc26210b9454e7c6ebae3022082f038c575c9b696913cfb631dda1cf89b8d35bc3fdc581c1dfa0f0b9217bec565a2bae3022082f0b4b26b3a4915a4e998322bfa9d1de0eed461187c6d53a65fac6a94d79347b7edbae3021b1c1d1e00fa5b3a8200f906f8425260c705f2f4f8416f246c31fa4030f82382015180a0109b108a107910681057104610354140c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54016a3036815a68f84252b0c705f2f48200f7f5f8232c8208093a80a0bcf2f4f8416f246c31fa4030109b108a10790810571046103544032100ec303a8200c592f8425270c705f2f4f8416f246c31fa4030109b108a107910681057104610354403c87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed54015482f09b1069dd0fbb446d0a0d52fd0dfe62942d9bd22999dbd96036f691d9e796562dbae3025f0cf2c0821f02c6109b5518db3cf84210364540705076804206c855505056810101cf0013ca0001cf16cccc810101cf00c9c8ccc95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb002021000c547b98547a96009ec87f01ca0055b050bc810101cf0019810101cf0017ca005005cf1613cc01c8cc58cf1658cf1612810101cf00c8431350455a206e95307001cb0192cf16e258cf16810101cf00c901ccc901ccc9ed5484c7e73d');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initAnimalHelperToken_init_args({ $$type: 'AnimalHelperToken_init_args', owner, distributionContract, nftContract, content, walletCode })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const AnimalHelperToken_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
    6765: { message: `Exceeds maximum token supply` },
    14796: { message: `Exceeds max supply` },
    23144: { message: `Not recovery address` },
    31651: { message: `Admin functions are temporarily locked` },
    42435: { message: `Not authorized` },
    50578: { message: `Only owner can set recovery address` },
    51754: { message: `Insufficient funds` },
    54566: { message: `Minting is paused` },
    63477: { message: `Cooldown period not passed` },
    63513: { message: `Token rate must be positive` },
    63750: { message: `Only owner can set temp admin` },
} as const

export const AnimalHelperToken_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Exceeds maximum token supply": 6765,
    "Exceeds max supply": 14796,
    "Not recovery address": 23144,
    "Admin functions are temporarily locked": 31651,
    "Not authorized": 42435,
    "Only owner can set recovery address": 50578,
    "Insufficient funds": 51754,
    "Minting is paused": 54566,
    "Cooldown period not passed": 63477,
    "Token rate must be positive": 63513,
    "Only owner can set temp admin": 63750,
} as const

const AnimalHelperToken_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"tokenRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetWalletAddress","header":3316846856,"fields":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateDistributionContractMessage","header":3597658823,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateNFTContractMessage","header":2320696427,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateContentMessage","header":1419921888,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"BuyTokensMessage","header":3668904916,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ToggleMintingMessage","header":1849045995,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"EmergencyWithdrawMessage","header":3855890798,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateTokenRateMessage","header":1372787303,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_rate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AdminParams","header":null,"fields":[{"name":"tempAdmin","type":{"kind":"simple","type":"address","optional":true}},{"name":"recoveryAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lockUntil","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AnimalHelperToken$Data","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"distributionContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"nftContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"adminParams","type":{"kind":"simple","type":"AdminParams","optional":false}}]},
]

const AnimalHelperToken_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "GetWalletAddress": 3316846856,
    "UpdateDistributionContractMessage": 3597658823,
    "UpdateNFTContractMessage": 2320696427,
    "UpdateContentMessage": 1419921888,
    "BuyTokensMessage": 3668904916,
    "ToggleMintingMessage": 1849045995,
    "EmergencyWithdrawMessage": 3855890798,
    "UpdateTokenRateMessage": 1372787303,
}

const AnimalHelperToken_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const AnimalHelperToken_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const AnimalHelperToken_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"BuyTokensMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ToggleMintingMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateDistributionContractMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateNFTContractMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateContentMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenRateMessage"}},
    {"receiver":"internal","message":{"kind":"text","text":"setTempAdmin"}},
    {"receiver":"internal","message":{"kind":"text","text":"recoveryAccess"}},
    {"receiver":"internal","message":{"kind":"text","text":"setRecoveryAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyWithdrawMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"get_jetton_data"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetWalletAddress"}},
]


export class AnimalHelperToken implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = AnimalHelperToken_errors_backward;
    public static readonly opcodes = AnimalHelperToken_opcodes;
    
    static async init(owner: Address, distributionContract: Address, nftContract: Address, content: Cell, walletCode: Cell) {
        return await AnimalHelperToken_init(owner, distributionContract, nftContract, content, walletCode);
    }
    
    static async fromInit(owner: Address, distributionContract: Address, nftContract: Address, content: Cell, walletCode: Cell) {
        const __gen_init = await AnimalHelperToken_init(owner, distributionContract, nftContract, content, walletCode);
        const address = contractAddress(0, __gen_init);
        return new AnimalHelperToken(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new AnimalHelperToken(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AnimalHelperToken_types,
        getters: AnimalHelperToken_getters,
        receivers: AnimalHelperToken_receivers,
        errors: AnimalHelperToken_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: BuyTokensMessage | ToggleMintingMessage | UpdateDistributionContractMessage | UpdateNFTContractMessage | UpdateContentMessage | UpdateTokenRateMessage | "setTempAdmin" | "recoveryAccess" | "setRecoveryAddress" | EmergencyWithdrawMessage | Deploy | "get_jetton_data" | GetWalletAddress) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyTokensMessage') {
            body = beginCell().store(storeBuyTokensMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ToggleMintingMessage') {
            body = beginCell().store(storeToggleMintingMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateDistributionContractMessage') {
            body = beginCell().store(storeUpdateDistributionContractMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateNFTContractMessage') {
            body = beginCell().store(storeUpdateNFTContractMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateContentMessage') {
            body = beginCell().store(storeUpdateContentMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenRateMessage') {
            body = beginCell().store(storeUpdateTokenRateMessage(message)).endCell();
        }
        if (message === "setTempAdmin") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "recoveryAccess") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "setRecoveryAddress") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyWithdrawMessage') {
            body = beginCell().store(storeEmergencyWithdrawMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === "get_jetton_data") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetWalletAddress') {
            body = beginCell().store(storeGetWalletAddress(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}