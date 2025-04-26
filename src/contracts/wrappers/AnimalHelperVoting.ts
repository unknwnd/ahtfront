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

export type StartVotingMessage = {
    $$type: 'StartVotingMessage';
}

export function storeStartVotingMessage(src: StartVotingMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3130093394, 32);
    };
}

export function loadStartVotingMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3130093394) { throw Error('Invalid prefix'); }
    return { $$type: 'StartVotingMessage' as const };
}

function loadTupleStartVotingMessage(source: TupleReader) {
    return { $$type: 'StartVotingMessage' as const };
}

function loadGetterTupleStartVotingMessage(source: TupleReader) {
    return { $$type: 'StartVotingMessage' as const };
}

function storeTupleStartVotingMessage(source: StartVotingMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserStartVotingMessage(): DictionaryValue<StartVotingMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStartVotingMessage(src)).endCell());
        },
        parse: (src) => {
            return loadStartVotingMessage(src.loadRef().beginParse());
        }
    }
}

export type AddProposalMessage = {
    $$type: 'AddProposalMessage';
    shelter_address: Address;
    name: string;
    description: string;
}

export function storeAddProposalMessage(src: AddProposalMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2450303598, 32);
        b_0.storeAddress(src.shelter_address);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadAddProposalMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2450303598) { throw Error('Invalid prefix'); }
    const _shelter_address = sc_0.loadAddress();
    const _name = sc_0.loadStringRefTail();
    const _description = sc_0.loadStringRefTail();
    return { $$type: 'AddProposalMessage' as const, shelter_address: _shelter_address, name: _name, description: _description };
}

function loadTupleAddProposalMessage(source: TupleReader) {
    const _shelter_address = source.readAddress();
    const _name = source.readString();
    const _description = source.readString();
    return { $$type: 'AddProposalMessage' as const, shelter_address: _shelter_address, name: _name, description: _description };
}

function loadGetterTupleAddProposalMessage(source: TupleReader) {
    const _shelter_address = source.readAddress();
    const _name = source.readString();
    const _description = source.readString();
    return { $$type: 'AddProposalMessage' as const, shelter_address: _shelter_address, name: _name, description: _description };
}

function storeTupleAddProposalMessage(source: AddProposalMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.shelter_address);
    builder.writeString(source.name);
    builder.writeString(source.description);
    return builder.build();
}

function dictValueParserAddProposalMessage(): DictionaryValue<AddProposalMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddProposalMessage(src)).endCell());
        },
        parse: (src) => {
            return loadAddProposalMessage(src.loadRef().beginParse());
        }
    }
}

export type VoteMessage = {
    $$type: 'VoteMessage';
    proposal_id: bigint;
}

export function storeVoteMessage(src: VoteMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(967831583, 32);
        b_0.storeUint(src.proposal_id, 32);
    };
}

export function loadVoteMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 967831583) { throw Error('Invalid prefix'); }
    const _proposal_id = sc_0.loadUintBig(32);
    return { $$type: 'VoteMessage' as const, proposal_id: _proposal_id };
}

function loadTupleVoteMessage(source: TupleReader) {
    const _proposal_id = source.readBigNumber();
    return { $$type: 'VoteMessage' as const, proposal_id: _proposal_id };
}

function loadGetterTupleVoteMessage(source: TupleReader) {
    const _proposal_id = source.readBigNumber();
    return { $$type: 'VoteMessage' as const, proposal_id: _proposal_id };
}

function storeTupleVoteMessage(source: VoteMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.proposal_id);
    return builder.build();
}

function dictValueParserVoteMessage(): DictionaryValue<VoteMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVoteMessage(src)).endCell());
        },
        parse: (src) => {
            return loadVoteMessage(src.loadRef().beginParse());
        }
    }
}

export type FinalizeVotingMessage = {
    $$type: 'FinalizeVotingMessage';
}

export function storeFinalizeVotingMessage(src: FinalizeVotingMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(200036361, 32);
    };
}

export function loadFinalizeVotingMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 200036361) { throw Error('Invalid prefix'); }
    return { $$type: 'FinalizeVotingMessage' as const };
}

function loadTupleFinalizeVotingMessage(source: TupleReader) {
    return { $$type: 'FinalizeVotingMessage' as const };
}

function loadGetterTupleFinalizeVotingMessage(source: TupleReader) {
    return { $$type: 'FinalizeVotingMessage' as const };
}

function storeTupleFinalizeVotingMessage(source: FinalizeVotingMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserFinalizeVotingMessage(): DictionaryValue<FinalizeVotingMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFinalizeVotingMessage(src)).endCell());
        },
        parse: (src) => {
            return loadFinalizeVotingMessage(src.loadRef().beginParse());
        }
    }
}

export type GetVotingStatusMessage = {
    $$type: 'GetVotingStatusMessage';
}

export function storeGetVotingStatusMessage(src: GetVotingStatusMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(404158069, 32);
    };
}

export function loadGetVotingStatusMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 404158069) { throw Error('Invalid prefix'); }
    return { $$type: 'GetVotingStatusMessage' as const };
}

function loadTupleGetVotingStatusMessage(source: TupleReader) {
    return { $$type: 'GetVotingStatusMessage' as const };
}

function loadGetterTupleGetVotingStatusMessage(source: TupleReader) {
    return { $$type: 'GetVotingStatusMessage' as const };
}

function storeTupleGetVotingStatusMessage(source: GetVotingStatusMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetVotingStatusMessage(): DictionaryValue<GetVotingStatusMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetVotingStatusMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetVotingStatusMessage(src.loadRef().beginParse());
        }
    }
}

export type GetProposalMessage = {
    $$type: 'GetProposalMessage';
    proposal_id: bigint;
}

export function storeGetProposalMessage(src: GetProposalMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2297840248, 32);
        b_0.storeUint(src.proposal_id, 32);
    };
}

export function loadGetProposalMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2297840248) { throw Error('Invalid prefix'); }
    const _proposal_id = sc_0.loadUintBig(32);
    return { $$type: 'GetProposalMessage' as const, proposal_id: _proposal_id };
}

function loadTupleGetProposalMessage(source: TupleReader) {
    const _proposal_id = source.readBigNumber();
    return { $$type: 'GetProposalMessage' as const, proposal_id: _proposal_id };
}

function loadGetterTupleGetProposalMessage(source: TupleReader) {
    const _proposal_id = source.readBigNumber();
    return { $$type: 'GetProposalMessage' as const, proposal_id: _proposal_id };
}

function storeTupleGetProposalMessage(source: GetProposalMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.proposal_id);
    return builder.build();
}

function dictValueParserGetProposalMessage(): DictionaryValue<GetProposalMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetProposalMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetProposalMessage(src.loadRef().beginParse());
        }
    }
}

export type GetLastResultsMessage = {
    $$type: 'GetLastResultsMessage';
}

export function storeGetLastResultsMessage(src: GetLastResultsMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2416196686, 32);
    };
}

export function loadGetLastResultsMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2416196686) { throw Error('Invalid prefix'); }
    return { $$type: 'GetLastResultsMessage' as const };
}

function loadTupleGetLastResultsMessage(source: TupleReader) {
    return { $$type: 'GetLastResultsMessage' as const };
}

function loadGetterTupleGetLastResultsMessage(source: TupleReader) {
    return { $$type: 'GetLastResultsMessage' as const };
}

function storeTupleGetLastResultsMessage(source: GetLastResultsMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetLastResultsMessage(): DictionaryValue<GetLastResultsMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetLastResultsMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetLastResultsMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateMinBalanceMessage = {
    $$type: 'UpdateMinBalanceMessage';
    min_balance: bigint;
}

export function storeUpdateMinBalanceMessage(src: UpdateMinBalanceMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3069928351, 32);
        b_0.storeUint(src.min_balance, 64);
    };
}

export function loadUpdateMinBalanceMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3069928351) { throw Error('Invalid prefix'); }
    const _min_balance = sc_0.loadUintBig(64);
    return { $$type: 'UpdateMinBalanceMessage' as const, min_balance: _min_balance };
}

function loadTupleUpdateMinBalanceMessage(source: TupleReader) {
    const _min_balance = source.readBigNumber();
    return { $$type: 'UpdateMinBalanceMessage' as const, min_balance: _min_balance };
}

function loadGetterTupleUpdateMinBalanceMessage(source: TupleReader) {
    const _min_balance = source.readBigNumber();
    return { $$type: 'UpdateMinBalanceMessage' as const, min_balance: _min_balance };
}

function storeTupleUpdateMinBalanceMessage(source: UpdateMinBalanceMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.min_balance);
    return builder.build();
}

function dictValueParserUpdateMinBalanceMessage(): DictionaryValue<UpdateMinBalanceMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateMinBalanceMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateMinBalanceMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateTokenContractMessage = {
    $$type: 'UpdateTokenContractMessage';
    new_address: Address;
}

export function storeUpdateTokenContractMessage(src: UpdateTokenContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(221433619, 32);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateTokenContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 221433619) { throw Error('Invalid prefix'); }
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateTokenContractMessage' as const, new_address: _new_address };
}

function loadTupleUpdateTokenContractMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateTokenContractMessage' as const, new_address: _new_address };
}

function loadGetterTupleUpdateTokenContractMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateTokenContractMessage' as const, new_address: _new_address };
}

function storeTupleUpdateTokenContractMessage(source: UpdateTokenContractMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateTokenContractMessage(): DictionaryValue<UpdateTokenContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateTokenContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenContractMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateAnimalHelperPoolMessage = {
    $$type: 'UpdateAnimalHelperPoolMessage';
    new_address: Address;
}

export function storeUpdateAnimalHelperPoolMessage(src: UpdateAnimalHelperPoolMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3337059901, 32);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateAnimalHelperPoolMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3337059901) { throw Error('Invalid prefix'); }
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateAnimalHelperPoolMessage' as const, new_address: _new_address };
}

function loadTupleUpdateAnimalHelperPoolMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateAnimalHelperPoolMessage' as const, new_address: _new_address };
}

function loadGetterTupleUpdateAnimalHelperPoolMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateAnimalHelperPoolMessage' as const, new_address: _new_address };
}

function storeTupleUpdateAnimalHelperPoolMessage(source: UpdateAnimalHelperPoolMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateAnimalHelperPoolMessage(): DictionaryValue<UpdateAnimalHelperPoolMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateAnimalHelperPoolMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAnimalHelperPoolMessage(src.loadRef().beginParse());
        }
    }
}

export type EmergencyWithdrawMessage = {
    $$type: 'EmergencyWithdrawMessage';
}

export function storeEmergencyWithdrawMessage(src: EmergencyWithdrawMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4207437585, 32);
    };
}

export function loadEmergencyWithdrawMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4207437585) { throw Error('Invalid prefix'); }
    return { $$type: 'EmergencyWithdrawMessage' as const };
}

function loadTupleEmergencyWithdrawMessage(source: TupleReader) {
    return { $$type: 'EmergencyWithdrawMessage' as const };
}

function loadGetterTupleEmergencyWithdrawMessage(source: TupleReader) {
    return { $$type: 'EmergencyWithdrawMessage' as const };
}

function storeTupleEmergencyWithdrawMessage(source: EmergencyWithdrawMessage) {
    const builder = new TupleBuilder();
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

export type Proposal = {
    $$type: 'Proposal';
    id: bigint;
    shelterAddress: Address;
    name: string;
    description: string;
    votes: bigint;
}

export function storeProposal(src: Proposal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.shelterAddress);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeInt(src.votes, 257);
    };
}

export function loadProposal(slice: Slice) {
    const sc_0 = slice;
    const _id = sc_0.loadIntBig(257);
    const _shelterAddress = sc_0.loadAddress();
    const _name = sc_0.loadStringRefTail();
    const _description = sc_0.loadStringRefTail();
    const _votes = sc_0.loadIntBig(257);
    return { $$type: 'Proposal' as const, id: _id, shelterAddress: _shelterAddress, name: _name, description: _description, votes: _votes };
}

function loadTupleProposal(source: TupleReader) {
    const _id = source.readBigNumber();
    const _shelterAddress = source.readAddress();
    const _name = source.readString();
    const _description = source.readString();
    const _votes = source.readBigNumber();
    return { $$type: 'Proposal' as const, id: _id, shelterAddress: _shelterAddress, name: _name, description: _description, votes: _votes };
}

function loadGetterTupleProposal(source: TupleReader) {
    const _id = source.readBigNumber();
    const _shelterAddress = source.readAddress();
    const _name = source.readString();
    const _description = source.readString();
    const _votes = source.readBigNumber();
    return { $$type: 'Proposal' as const, id: _id, shelterAddress: _shelterAddress, name: _name, description: _description, votes: _votes };
}

function storeTupleProposal(source: Proposal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.shelterAddress);
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeNumber(source.votes);
    return builder.build();
}

function dictValueParserProposal(): DictionaryValue<Proposal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposal(src)).endCell());
        },
        parse: (src) => {
            return loadProposal(src.loadRef().beginParse());
        }
    }
}

export type AnimalHelperVoting$Data = {
    $$type: 'AnimalHelperVoting$Data';
    owner: Address;
    tokenContract: Address;
    animalHelperPool: Address;
    proposalsCount: bigint;
    votingActive: boolean;
    votingStartTime: bigint;
    votingEndTime: bigint;
    minTokenBalance: bigint;
    lastVotingResults: Cell;
    proposals: Dictionary<bigint, Proposal>;
    votes: Dictionary<Address, bigint>;
    voterTokenBalances: Dictionary<Address, bigint>;
}

export function storeAnimalHelperVoting$Data(src: AnimalHelperVoting$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.tokenContract);
        b_0.storeAddress(src.animalHelperPool);
        const b_1 = new Builder();
        b_1.storeInt(src.proposalsCount, 257);
        b_1.storeBit(src.votingActive);
        b_1.storeInt(src.votingStartTime, 257);
        b_1.storeInt(src.votingEndTime, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.minTokenBalance, 257);
        b_2.storeRef(src.lastVotingResults);
        b_2.storeDict(src.proposals, Dictionary.Keys.BigInt(257), dictValueParserProposal());
        b_2.storeDict(src.votes, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_2.storeDict(src.voterTokenBalances, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAnimalHelperVoting$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _tokenContract = sc_0.loadAddress();
    const _animalHelperPool = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _proposalsCount = sc_1.loadIntBig(257);
    const _votingActive = sc_1.loadBit();
    const _votingStartTime = sc_1.loadIntBig(257);
    const _votingEndTime = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _minTokenBalance = sc_2.loadIntBig(257);
    const _lastVotingResults = sc_2.loadRef();
    const _proposals = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserProposal(), sc_2);
    const _votes = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_2);
    const _voterTokenBalances = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_2);
    return { $$type: 'AnimalHelperVoting$Data' as const, owner: _owner, tokenContract: _tokenContract, animalHelperPool: _animalHelperPool, proposalsCount: _proposalsCount, votingActive: _votingActive, votingStartTime: _votingStartTime, votingEndTime: _votingEndTime, minTokenBalance: _minTokenBalance, lastVotingResults: _lastVotingResults, proposals: _proposals, votes: _votes, voterTokenBalances: _voterTokenBalances };
}

function loadTupleAnimalHelperVoting$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _tokenContract = source.readAddress();
    const _animalHelperPool = source.readAddress();
    const _proposalsCount = source.readBigNumber();
    const _votingActive = source.readBoolean();
    const _votingStartTime = source.readBigNumber();
    const _votingEndTime = source.readBigNumber();
    const _minTokenBalance = source.readBigNumber();
    const _lastVotingResults = source.readCell();
    const _proposals = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserProposal(), source.readCellOpt());
    const _votes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _voterTokenBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'AnimalHelperVoting$Data' as const, owner: _owner, tokenContract: _tokenContract, animalHelperPool: _animalHelperPool, proposalsCount: _proposalsCount, votingActive: _votingActive, votingStartTime: _votingStartTime, votingEndTime: _votingEndTime, minTokenBalance: _minTokenBalance, lastVotingResults: _lastVotingResults, proposals: _proposals, votes: _votes, voterTokenBalances: _voterTokenBalances };
}

function loadGetterTupleAnimalHelperVoting$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _tokenContract = source.readAddress();
    const _animalHelperPool = source.readAddress();
    const _proposalsCount = source.readBigNumber();
    const _votingActive = source.readBoolean();
    const _votingStartTime = source.readBigNumber();
    const _votingEndTime = source.readBigNumber();
    const _minTokenBalance = source.readBigNumber();
    const _lastVotingResults = source.readCell();
    const _proposals = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserProposal(), source.readCellOpt());
    const _votes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _voterTokenBalances = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'AnimalHelperVoting$Data' as const, owner: _owner, tokenContract: _tokenContract, animalHelperPool: _animalHelperPool, proposalsCount: _proposalsCount, votingActive: _votingActive, votingStartTime: _votingStartTime, votingEndTime: _votingEndTime, minTokenBalance: _minTokenBalance, lastVotingResults: _lastVotingResults, proposals: _proposals, votes: _votes, voterTokenBalances: _voterTokenBalances };
}

function storeTupleAnimalHelperVoting$Data(source: AnimalHelperVoting$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.tokenContract);
    builder.writeAddress(source.animalHelperPool);
    builder.writeNumber(source.proposalsCount);
    builder.writeBoolean(source.votingActive);
    builder.writeNumber(source.votingStartTime);
    builder.writeNumber(source.votingEndTime);
    builder.writeNumber(source.minTokenBalance);
    builder.writeCell(source.lastVotingResults);
    builder.writeCell(source.proposals.size > 0 ? beginCell().storeDictDirect(source.proposals, Dictionary.Keys.BigInt(257), dictValueParserProposal()).endCell() : null);
    builder.writeCell(source.votes.size > 0 ? beginCell().storeDictDirect(source.votes, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.voterTokenBalances.size > 0 ? beginCell().storeDictDirect(source.voterTokenBalances, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserAnimalHelperVoting$Data(): DictionaryValue<AnimalHelperVoting$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAnimalHelperVoting$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperVoting$Data(src.loadRef().beginParse());
        }
    }
}

 type AnimalHelperVoting_init_args = {
    $$type: 'AnimalHelperVoting_init_args';
    owner: Address;
    tokenContract: Address;
    animalHelperPool: Address;
}

function initAnimalHelperVoting_init_args(src: AnimalHelperVoting_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.tokenContract);
        b_0.storeAddress(src.animalHelperPool);
    };
}

async function AnimalHelperVoting_init(owner: Address, tokenContract: Address, animalHelperPool: Address) {
    const __code = Cell.fromHex('b5ee9c7241021f01000a19000228ff008e88f4a413f4bcf2c80bed5320e303ed43d9010301bba651477b5134348000638cbe903e903e9035007420404075c0348020404075c020404075c0350c3420404075c0353d013d013d010c04270426c4269b0723867e903e903e90154800f4561c1c14c46040fa1b5b5b7232554838b6cf1b30600200022b01f63001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e32fa40fa40fa40d401d0810101d700d200810101d700810101d700d430d0810101d700d4f404f404f40430109c109b109a6c1c8e19fa40fa40fa40552003d158707053118103e86d6d6dc8c95520e20d925f0de00bd70d1ff2e082210401fc8210ba916f52ba8e735f0335385b368138c6f8425250c705f2f481616506b316f2f47ff823208208278d00a0105710461035700555036d6d6dc87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed54e02105044a8210920caa6ebae30221821039aff01fbae3022182100bec5009bae3022182101816f675ba06080c1202fe31fa40d401d001d401d043303381203629f2f4813c8df82328b9f2f4f84210cd10bd10ad109d108d107d106d105d104d103d4ef0db3c815d675116bef2f4284e1350fd70553081010105c855405045810101cf0058cf16c858cf16c901ccc858cf16c901cc810101cf00c927103c01206e953059f45a30944133f415e205a4090700a0108b107a106908104710364540c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5402fc31d31f013181203627f2f4813c8df82326b9f2f48200e7e981010bf8422e598101014133f40a6fa19401d70030925b6de26ef2f48147345318b9f2f4f84210bc10ab109a10891078106710561045103443d0db3c815d675316bef2f481010bf842221034810101216e955b59f4593098c801cf004133f441e2238101012f090a004681010b22028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e0302401f459f40d6fa192306ddf206e92306d8e1bd0810101d700fa40d401d001d401d001810101d70055406c156f05e2206ef2d0806f255006a00581010106c855405045810101cf0058cf16c858cf16c901ccc858cf16c901cc810101cf00c9444052e0206e953059f45a30944133f415e281010bf8420ea441e08101010b00ce216e955b59f4593098c801cf004133f441e210ab109a1089107810671056104510344300c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5404fe5b8200dfa6f84252b0c705917f94f82325bee2f2f481559226f2f4109b5518db3c23104555201110111111100f11110f0e11110e0d11110d0c11110c0b11110b0a11110a0911110908111108071111070611110605111105db3c34377f820afaf08072c87101cb1f500fcf16c92b0450ff146d50436d4133c8cf8580ca00890d0f101101c070530093530bb98e46258101012259f40d6fa192306ddf206e92306d8e1bd0810101d700fa40d401d001d401d001810101d70055406c156f05e2206ef2d0806f256c415303bc946c2251109130e2a4e83031810101240259f40d6fa192306ddf0e0054206e92306d8e1bd0810101d700fa40d401d001d401d001810101d70055406c156f05e2206ef2d0806f2500286c21c8c9c814cb1f58cf1612cccb7f5260cb3fc900011000f0cf16ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00109a10891078106770075505c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5404e68ed45bc85260ca005250cb3f5240cb3f5270cb1fc9f84270588042015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00109b5518e021821088f64278bae30221821090043c4ebae302218210b6fb639fba1c13171803fe31d31f01318147345318b9f2f4810101220259f40d6fa192306ddf206e92306d8e1bd0810101d700fa40d401d001d401d001810101d70055406c156f05e2206ef2d0806f256c21c8c9c8c9c815cb1f5003cf1613cccccb7fc9f84270588042015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a8a14151600065bcf81001a58cf8680cf8480f400f400cf81009ce2f400c901fb00109b5518c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5401825bf842708042245a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00109b55181c03fc8e66313302d33f01318138c6f84252b0c705f2f4109b108a10791068105710461035504403c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed54e02182100d32cf13bae302218210c6e77e3dbae30221191a1b00c8313908fa4001318138c6f84252b0c705f2f4109b0a107910681057104610354403c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5400ca313807fa4001318138c6f84252b0c705f2f4109b108a091068105710461035443012c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5402d08210fac86711ba8ecf5b8138c6f84252b0c705f2f4f8427070810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00109b5518e0018210946a98b6bae3025f0df2c0821c1d0086c87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed5401ded33f0131c8018210aff90f5758cb1fcb3fc910ac109b108a10791068105710461035443012f84201706ddb3cc87f01ca0055b050cbcf165009cf165007cf1605c8810101cf0014ca0012810101cf00810101cf0001c8810101cf0013cc13f40014f40012f400c958ccc901ccc9ed541e00a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00232e0da1');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initAnimalHelperVoting_init_args({ $$type: 'AnimalHelperVoting_init_args', owner, tokenContract, animalHelperPool })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const AnimalHelperVoting_errors = {
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
    8246: { message: `Voting not active` },
    14534: { message: `Not owner` },
    15501: { message: `Voting period ended` },
    18228: { message: `Invalid proposal ID` },
    21906: { message: `No active voting` },
    23911: { message: `Insufficient token balance` },
    24933: { message: `Voting already active` },
    57254: { message: `Not allowed or voting not ended` },
    59369: { message: `Already voted` },
} as const

export const AnimalHelperVoting_errors_backward = {
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
    "Voting not active": 8246,
    "Not owner": 14534,
    "Voting period ended": 15501,
    "Invalid proposal ID": 18228,
    "No active voting": 21906,
    "Insufficient token balance": 23911,
    "Voting already active": 24933,
    "Not allowed or voting not ended": 57254,
    "Already voted": 59369,
} as const

const AnimalHelperVoting_types: ABIType[] = [
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
    {"name":"StartVotingMessage","header":3130093394,"fields":[]},
    {"name":"AddProposalMessage","header":2450303598,"fields":[{"name":"shelter_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"VoteMessage","header":967831583,"fields":[{"name":"proposal_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"FinalizeVotingMessage","header":200036361,"fields":[]},
    {"name":"GetVotingStatusMessage","header":404158069,"fields":[]},
    {"name":"GetProposalMessage","header":2297840248,"fields":[{"name":"proposal_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"GetLastResultsMessage","header":2416196686,"fields":[]},
    {"name":"UpdateMinBalanceMessage","header":3069928351,"fields":[{"name":"min_balance","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateTokenContractMessage","header":221433619,"fields":[{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateAnimalHelperPoolMessage","header":3337059901,"fields":[{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EmergencyWithdrawMessage","header":4207437585,"fields":[]},
    {"name":"Proposal","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shelterAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"votes","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AnimalHelperVoting$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"animalHelperPool","type":{"kind":"simple","type":"address","optional":false}},{"name":"proposalsCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"votingActive","type":{"kind":"simple","type":"bool","optional":false}},{"name":"votingStartTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"votingEndTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTokenBalance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastVotingResults","type":{"kind":"simple","type":"cell","optional":false}},{"name":"proposals","type":{"kind":"dict","key":"int","value":"Proposal","valueFormat":"ref"}},{"name":"votes","type":{"kind":"dict","key":"address","value":"int"}},{"name":"voterTokenBalances","type":{"kind":"dict","key":"address","value":"int"}}]},
]

const AnimalHelperVoting_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "StartVotingMessage": 3130093394,
    "AddProposalMessage": 2450303598,
    "VoteMessage": 967831583,
    "FinalizeVotingMessage": 200036361,
    "GetVotingStatusMessage": 404158069,
    "GetProposalMessage": 2297840248,
    "GetLastResultsMessage": 2416196686,
    "UpdateMinBalanceMessage": 3069928351,
    "UpdateTokenContractMessage": 221433619,
    "UpdateAnimalHelperPoolMessage": 3337059901,
    "EmergencyWithdrawMessage": 4207437585,
}

const AnimalHelperVoting_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const AnimalHelperVoting_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const AnimalHelperVoting_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"StartVotingMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddProposalMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"VoteMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FinalizeVotingMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetVotingStatusMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetProposalMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetLastResultsMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateMinBalanceMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenContractMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateAnimalHelperPoolMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyWithdrawMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class AnimalHelperVoting implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = AnimalHelperVoting_errors_backward;
    public static readonly opcodes = AnimalHelperVoting_opcodes;
    
    static async init(owner: Address, tokenContract: Address, animalHelperPool: Address) {
        return await AnimalHelperVoting_init(owner, tokenContract, animalHelperPool);
    }
    
    static async fromInit(owner: Address, tokenContract: Address, animalHelperPool: Address) {
        const __gen_init = await AnimalHelperVoting_init(owner, tokenContract, animalHelperPool);
        const address = contractAddress(0, __gen_init);
        return new AnimalHelperVoting(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new AnimalHelperVoting(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AnimalHelperVoting_types,
        getters: AnimalHelperVoting_getters,
        receivers: AnimalHelperVoting_receivers,
        errors: AnimalHelperVoting_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: StartVotingMessage | AddProposalMessage | VoteMessage | FinalizeVotingMessage | GetVotingStatusMessage | GetProposalMessage | GetLastResultsMessage | UpdateMinBalanceMessage | UpdateTokenContractMessage | UpdateAnimalHelperPoolMessage | EmergencyWithdrawMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StartVotingMessage') {
            body = beginCell().store(storeStartVotingMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddProposalMessage') {
            body = beginCell().store(storeAddProposalMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VoteMessage') {
            body = beginCell().store(storeVoteMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FinalizeVotingMessage') {
            body = beginCell().store(storeFinalizeVotingMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetVotingStatusMessage') {
            body = beginCell().store(storeGetVotingStatusMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetProposalMessage') {
            body = beginCell().store(storeGetProposalMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetLastResultsMessage') {
            body = beginCell().store(storeGetLastResultsMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateMinBalanceMessage') {
            body = beginCell().store(storeUpdateMinBalanceMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenContractMessage') {
            body = beginCell().store(storeUpdateTokenContractMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateAnimalHelperPoolMessage') {
            body = beginCell().store(storeUpdateAnimalHelperPoolMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyWithdrawMessage') {
            body = beginCell().store(storeEmergencyWithdrawMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
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