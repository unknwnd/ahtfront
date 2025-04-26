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

export type UpdateLiquidityPoolMessage = {
    $$type: 'UpdateLiquidityPoolMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateLiquidityPoolMessage(src: UpdateLiquidityPoolMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2925792993, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateLiquidityPoolMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2925792993) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateLiquidityPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateLiquidityPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateLiquidityPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateLiquidityPoolMessage(source: UpdateLiquidityPoolMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateLiquidityPoolMessage(): DictionaryValue<UpdateLiquidityPoolMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLiquidityPoolMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLiquidityPoolMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateAnimalHelperPoolMessage = {
    $$type: 'UpdateAnimalHelperPoolMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateAnimalHelperPoolMessage(src: UpdateAnimalHelperPoolMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1357296989, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateAnimalHelperPoolMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1357296989) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateAnimalHelperPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateAnimalHelperPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateAnimalHelperPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateAnimalHelperPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateAnimalHelperPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateAnimalHelperPoolMessage(source: UpdateAnimalHelperPoolMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
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

export type UpdateProjectPoolMessage = {
    $$type: 'UpdateProjectPoolMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateProjectPoolMessage(src: UpdateProjectPoolMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3020695181, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateProjectPoolMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3020695181) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateProjectPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateProjectPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateProjectPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateProjectPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateProjectPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateProjectPoolMessage(source: UpdateProjectPoolMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateProjectPoolMessage(): DictionaryValue<UpdateProjectPoolMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateProjectPoolMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProjectPoolMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateInvestorsCreatorsPoolMessage = {
    $$type: 'UpdateInvestorsCreatorsPoolMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateInvestorsCreatorsPoolMessage(src: UpdateInvestorsCreatorsPoolMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3245794019, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateInvestorsCreatorsPoolMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3245794019) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateInvestorsCreatorsPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateInvestorsCreatorsPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateInvestorsCreatorsPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateInvestorsCreatorsPoolMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateInvestorsCreatorsPoolMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateInvestorsCreatorsPoolMessage(source: UpdateInvestorsCreatorsPoolMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateInvestorsCreatorsPoolMessage(): DictionaryValue<UpdateInvestorsCreatorsPoolMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateInvestorsCreatorsPoolMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateInvestorsCreatorsPoolMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateLiquidityLockMessage = {
    $$type: 'UpdateLiquidityLockMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateLiquidityLockMessage(src: UpdateLiquidityLockMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(562200191, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateLiquidityLockMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 562200191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateLiquidityLockMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateLiquidityLockMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityLockMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateLiquidityLockMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityLockMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateLiquidityLockMessage(source: UpdateLiquidityLockMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateLiquidityLockMessage(): DictionaryValue<UpdateLiquidityLockMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLiquidityLockMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLiquidityLockMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateDistributionRatioMessage = {
    $$type: 'UpdateDistributionRatioMessage';
    queryId: bigint;
    liq_percent: bigint;
    animal_percent: bigint;
    proj_percent: bigint;
    inv_creat_percent: bigint;
}

export function storeUpdateDistributionRatioMessage(src: UpdateDistributionRatioMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2820705846, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.liq_percent, 257);
        b_0.storeInt(src.animal_percent, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.proj_percent, 257);
        b_1.storeInt(src.inv_creat_percent, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateDistributionRatioMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2820705846) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _liq_percent = sc_0.loadIntBig(257);
    const _animal_percent = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _proj_percent = sc_1.loadIntBig(257);
    const _inv_creat_percent = sc_1.loadIntBig(257);
    return { $$type: 'UpdateDistributionRatioMessage' as const, queryId: _queryId, liq_percent: _liq_percent, animal_percent: _animal_percent, proj_percent: _proj_percent, inv_creat_percent: _inv_creat_percent };
}

function loadTupleUpdateDistributionRatioMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _liq_percent = source.readBigNumber();
    const _animal_percent = source.readBigNumber();
    const _proj_percent = source.readBigNumber();
    const _inv_creat_percent = source.readBigNumber();
    return { $$type: 'UpdateDistributionRatioMessage' as const, queryId: _queryId, liq_percent: _liq_percent, animal_percent: _animal_percent, proj_percent: _proj_percent, inv_creat_percent: _inv_creat_percent };
}

function loadGetterTupleUpdateDistributionRatioMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _liq_percent = source.readBigNumber();
    const _animal_percent = source.readBigNumber();
    const _proj_percent = source.readBigNumber();
    const _inv_creat_percent = source.readBigNumber();
    return { $$type: 'UpdateDistributionRatioMessage' as const, queryId: _queryId, liq_percent: _liq_percent, animal_percent: _animal_percent, proj_percent: _proj_percent, inv_creat_percent: _inv_creat_percent };
}

function storeTupleUpdateDistributionRatioMessage(source: UpdateDistributionRatioMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.liq_percent);
    builder.writeNumber(source.animal_percent);
    builder.writeNumber(source.proj_percent);
    builder.writeNumber(source.inv_creat_percent);
    return builder.build();
}

function dictValueParserUpdateDistributionRatioMessage(): DictionaryValue<UpdateDistributionRatioMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateDistributionRatioMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateDistributionRatioMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateLockRatioMessage = {
    $$type: 'UpdateLockRatioMessage';
    queryId: bigint;
    lock_percent: bigint;
}

export function storeUpdateLockRatioMessage(src: UpdateLockRatioMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2559550766, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.lock_percent, 257);
    };
}

export function loadUpdateLockRatioMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2559550766) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _lock_percent = sc_0.loadIntBig(257);
    return { $$type: 'UpdateLockRatioMessage' as const, queryId: _queryId, lock_percent: _lock_percent };
}

function loadTupleUpdateLockRatioMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _lock_percent = source.readBigNumber();
    return { $$type: 'UpdateLockRatioMessage' as const, queryId: _queryId, lock_percent: _lock_percent };
}

function loadGetterTupleUpdateLockRatioMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _lock_percent = source.readBigNumber();
    return { $$type: 'UpdateLockRatioMessage' as const, queryId: _queryId, lock_percent: _lock_percent };
}

function storeTupleUpdateLockRatioMessage(source: UpdateLockRatioMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.lock_percent);
    return builder.build();
}

function dictValueParserUpdateLockRatioMessage(): DictionaryValue<UpdateLockRatioMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLockRatioMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLockRatioMessage(src.loadRef().beginParse());
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

export type AdminConfig = {
    $$type: 'AdminConfig';
    tempAdmin: Address | null;
    recoveryAddress: Address;
    lockUntil: bigint;
    proposalId: bigint;
    pendingProposals: Dictionary<bigint, Cell>;
}

export function storeAdminConfig(src: AdminConfig) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.tempAdmin);
        b_0.storeAddress(src.recoveryAddress);
        b_0.storeInt(src.lockUntil, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.proposalId, 257);
        b_1.storeDict(src.pendingProposals, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAdminConfig(slice: Slice) {
    const sc_0 = slice;
    const _tempAdmin = sc_0.loadMaybeAddress();
    const _recoveryAddress = sc_0.loadAddress();
    const _lockUntil = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _proposalId = sc_1.loadIntBig(257);
    const _pendingProposals = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_1);
    return { $$type: 'AdminConfig' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil, proposalId: _proposalId, pendingProposals: _pendingProposals };
}

function loadTupleAdminConfig(source: TupleReader) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    const _pendingProposals = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'AdminConfig' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil, proposalId: _proposalId, pendingProposals: _pendingProposals };
}

function loadGetterTupleAdminConfig(source: TupleReader) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    const _proposalId = source.readBigNumber();
    const _pendingProposals = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'AdminConfig' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil, proposalId: _proposalId, pendingProposals: _pendingProposals };
}

function storeTupleAdminConfig(source: AdminConfig) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.tempAdmin);
    builder.writeAddress(source.recoveryAddress);
    builder.writeNumber(source.lockUntil);
    builder.writeNumber(source.proposalId);
    builder.writeCell(source.pendingProposals.size > 0 ? beginCell().storeDictDirect(source.pendingProposals, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    return builder.build();
}

function dictValueParserAdminConfig(): DictionaryValue<AdminConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAdminConfig(src)).endCell());
        },
        parse: (src) => {
            return loadAdminConfig(src.loadRef().beginParse());
        }
    }
}

export type TransactionSummary = {
    $$type: 'TransactionSummary';
    successCount: bigint;
    failCount: bigint;
    totalSent: bigint;
}

export function storeTransactionSummary(src: TransactionSummary) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.successCount, 257);
        b_0.storeInt(src.failCount, 257);
        b_0.storeInt(src.totalSent, 257);
    };
}

export function loadTransactionSummary(slice: Slice) {
    const sc_0 = slice;
    const _successCount = sc_0.loadIntBig(257);
    const _failCount = sc_0.loadIntBig(257);
    const _totalSent = sc_0.loadIntBig(257);
    return { $$type: 'TransactionSummary' as const, successCount: _successCount, failCount: _failCount, totalSent: _totalSent };
}

function loadTupleTransactionSummary(source: TupleReader) {
    const _successCount = source.readBigNumber();
    const _failCount = source.readBigNumber();
    const _totalSent = source.readBigNumber();
    return { $$type: 'TransactionSummary' as const, successCount: _successCount, failCount: _failCount, totalSent: _totalSent };
}

function loadGetterTupleTransactionSummary(source: TupleReader) {
    const _successCount = source.readBigNumber();
    const _failCount = source.readBigNumber();
    const _totalSent = source.readBigNumber();
    return { $$type: 'TransactionSummary' as const, successCount: _successCount, failCount: _failCount, totalSent: _totalSent };
}

function storeTupleTransactionSummary(source: TransactionSummary) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.successCount);
    builder.writeNumber(source.failCount);
    builder.writeNumber(source.totalSent);
    return builder.build();
}

function dictValueParserTransactionSummary(): DictionaryValue<TransactionSummary> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransactionSummary(src)).endCell());
        },
        parse: (src) => {
            return loadTransactionSummary(src.loadRef().beginParse());
        }
    }
}

export type FundsDistributor$Data = {
    $$type: 'FundsDistributor$Data';
    owner: Address;
    liquidityPool: Address;
    liquidityLock: Address;
    animalHelperPool: Address;
    projectPool: Address;
    investorsCreatorsPool: Address;
    liquidityPercent: bigint;
    animalHelperPercent: bigint;
    projectPercent: bigint;
    investorsCreatorsPercent: bigint;
    lockPercent: bigint;
    minDistributionAmount: bigint;
    adminConfig: AdminConfig;
    transactionMetrics: TransactionSummary;
}

export function storeFundsDistributor$Data(src: FundsDistributor$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.liquidityPool);
        b_0.storeAddress(src.liquidityLock);
        const b_1 = new Builder();
        b_1.storeAddress(src.animalHelperPool);
        b_1.storeAddress(src.projectPool);
        b_1.storeAddress(src.investorsCreatorsPool);
        const b_2 = new Builder();
        b_2.storeInt(src.liquidityPercent, 257);
        b_2.storeInt(src.animalHelperPercent, 257);
        b_2.storeInt(src.projectPercent, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.investorsCreatorsPercent, 257);
        b_3.storeInt(src.lockPercent, 257);
        b_3.storeInt(src.minDistributionAmount, 257);
        const b_4 = new Builder();
        b_4.store(storeAdminConfig(src.adminConfig));
        const b_5 = new Builder();
        b_5.store(storeTransactionSummary(src.transactionMetrics));
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadFundsDistributor$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _liquidityPool = sc_0.loadAddress();
    const _liquidityLock = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _animalHelperPool = sc_1.loadAddress();
    const _projectPool = sc_1.loadAddress();
    const _investorsCreatorsPool = sc_1.loadAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _liquidityPercent = sc_2.loadIntBig(257);
    const _animalHelperPercent = sc_2.loadIntBig(257);
    const _projectPercent = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _investorsCreatorsPercent = sc_3.loadIntBig(257);
    const _lockPercent = sc_3.loadIntBig(257);
    const _minDistributionAmount = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _adminConfig = loadAdminConfig(sc_4);
    const sc_5 = sc_4.loadRef().beginParse();
    const _transactionMetrics = loadTransactionSummary(sc_5);
    return { $$type: 'FundsDistributor$Data' as const, owner: _owner, liquidityPool: _liquidityPool, liquidityLock: _liquidityLock, animalHelperPool: _animalHelperPool, projectPool: _projectPool, investorsCreatorsPool: _investorsCreatorsPool, liquidityPercent: _liquidityPercent, animalHelperPercent: _animalHelperPercent, projectPercent: _projectPercent, investorsCreatorsPercent: _investorsCreatorsPercent, lockPercent: _lockPercent, minDistributionAmount: _minDistributionAmount, adminConfig: _adminConfig, transactionMetrics: _transactionMetrics };
}

function loadTupleFundsDistributor$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _liquidityPool = source.readAddress();
    const _liquidityLock = source.readAddress();
    const _animalHelperPool = source.readAddress();
    const _projectPool = source.readAddress();
    const _investorsCreatorsPool = source.readAddress();
    const _liquidityPercent = source.readBigNumber();
    const _animalHelperPercent = source.readBigNumber();
    const _projectPercent = source.readBigNumber();
    const _investorsCreatorsPercent = source.readBigNumber();
    const _lockPercent = source.readBigNumber();
    const _minDistributionAmount = source.readBigNumber();
    const _adminConfig = loadTupleAdminConfig(source);
    const _transactionMetrics = loadTupleTransactionSummary(source);
    return { $$type: 'FundsDistributor$Data' as const, owner: _owner, liquidityPool: _liquidityPool, liquidityLock: _liquidityLock, animalHelperPool: _animalHelperPool, projectPool: _projectPool, investorsCreatorsPool: _investorsCreatorsPool, liquidityPercent: _liquidityPercent, animalHelperPercent: _animalHelperPercent, projectPercent: _projectPercent, investorsCreatorsPercent: _investorsCreatorsPercent, lockPercent: _lockPercent, minDistributionAmount: _minDistributionAmount, adminConfig: _adminConfig, transactionMetrics: _transactionMetrics };
}

function loadGetterTupleFundsDistributor$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _liquidityPool = source.readAddress();
    const _liquidityLock = source.readAddress();
    const _animalHelperPool = source.readAddress();
    const _projectPool = source.readAddress();
    const _investorsCreatorsPool = source.readAddress();
    const _liquidityPercent = source.readBigNumber();
    const _animalHelperPercent = source.readBigNumber();
    const _projectPercent = source.readBigNumber();
    const _investorsCreatorsPercent = source.readBigNumber();
    const _lockPercent = source.readBigNumber();
    const _minDistributionAmount = source.readBigNumber();
    const _adminConfig = loadGetterTupleAdminConfig(source);
    const _transactionMetrics = loadGetterTupleTransactionSummary(source);
    return { $$type: 'FundsDistributor$Data' as const, owner: _owner, liquidityPool: _liquidityPool, liquidityLock: _liquidityLock, animalHelperPool: _animalHelperPool, projectPool: _projectPool, investorsCreatorsPool: _investorsCreatorsPool, liquidityPercent: _liquidityPercent, animalHelperPercent: _animalHelperPercent, projectPercent: _projectPercent, investorsCreatorsPercent: _investorsCreatorsPercent, lockPercent: _lockPercent, minDistributionAmount: _minDistributionAmount, adminConfig: _adminConfig, transactionMetrics: _transactionMetrics };
}

function storeTupleFundsDistributor$Data(source: FundsDistributor$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.liquidityPool);
    builder.writeAddress(source.liquidityLock);
    builder.writeAddress(source.animalHelperPool);
    builder.writeAddress(source.projectPool);
    builder.writeAddress(source.investorsCreatorsPool);
    builder.writeNumber(source.liquidityPercent);
    builder.writeNumber(source.animalHelperPercent);
    builder.writeNumber(source.projectPercent);
    builder.writeNumber(source.investorsCreatorsPercent);
    builder.writeNumber(source.lockPercent);
    builder.writeNumber(source.minDistributionAmount);
    builder.writeTuple(storeTupleAdminConfig(source.adminConfig));
    builder.writeTuple(storeTupleTransactionSummary(source.transactionMetrics));
    return builder.build();
}

function dictValueParserFundsDistributor$Data(): DictionaryValue<FundsDistributor$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFundsDistributor$Data(src)).endCell());
        },
        parse: (src) => {
            return loadFundsDistributor$Data(src.loadRef().beginParse());
        }
    }
}

 type FundsDistributor_init_args = {
    $$type: 'FundsDistributor_init_args';
    owner: Address;
    liquidityPool: Address;
    liquidityLock: Address;
    animalHelperPool: Address;
    projectPool: Address;
    investorsCreatorsPool: Address;
}

function initFundsDistributor_init_args(src: FundsDistributor_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.liquidityPool);
        b_0.storeAddress(src.liquidityLock);
        const b_1 = new Builder();
        b_1.storeAddress(src.animalHelperPool);
        b_1.storeAddress(src.projectPool);
        b_1.storeAddress(src.investorsCreatorsPool);
        b_0.storeRef(b_1.endCell());
    };
}

async function FundsDistributor_init(owner: Address, liquidityPool: Address, liquidityLock: Address, animalHelperPool: Address, projectPool: Address, investorsCreatorsPool: Address) {
    const __code = Cell.fromHex('b5ee9c7241023c010013d9000228ff008e88f4a413f4bcf2c80bed5320e303ed43d9010302cba651477b513434800063a736cf15c504448444c44484444444844444440444444403c44403d543a38cfe903e903e903500743e903e903e900c040d840d440d01b45541201060051e9d6011a0822625a00adb5c150480040bdb5c14c038b6cf15c417c3db106004020004561303f630eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e9cdb3c57141112111311121111111211111110111111100f11100f550e8e33fa40fa40fa40d401d0fa40fa40fa403010361035103406d15504804180147a75804682089896802b6d70541200102f6d705300e21115e3027004060701f6fa40fa40fa40d401d0fa40fa40fa40d430d0810101d700810101d700810101d700d430d0810101d700810101d700810101d700d430d020d70b01c30093fa40019472d7216de201fa40810101d700d401d0810101d700f4043010251024102305d430d0810101d700810101d700810101d70055203311111114111105002a11111113111111111112111110671056104510345800085f0f5f0604c05614d74920c21fe30001c00001c121b0e3021113f9012082f0657e718d769fdc45d75f970e06cc870ac82d38d629dfd83c69b838dcbb86501bbae3022082f0d6e7c39a8f757dc7b2b81517576ae419adcd53b20b1c3facdcf6a7c3a46bad11ba08162a2c0456311114d31f218210e5d4396ebae302218210ae640ee1bae30221821021827e7fbae302218210988fa52eba090a0b0c02e85b57131111111311111110111211100f11110f0e11100e10df551cdb3cf8427070810081036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca001114111311121111111055e0db3cc9ed54db31393a02de3157141113810101d700fa40596c211112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c57121112111311121110111111100f11100f550ec87f01ca001114111311121111111055e0db3cc9ed54db31393a02de3157141113810101d700fa40596c211112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c57111112111311121111111211110f11100f550ec87f01ca001114111311121111111055e0db3cc9ed54db31393a03fe8f7d3157141113810101d700810101d700596c211112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c39820098535614c2ff945614c1659170e2f2f41112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a5507390d0e0130c87f01ca001114111311121111111055e0db3cc9ed54db313a03fce021821050e6b55dba8f713157141113810101d700fa40596c211112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c5710111211131112111111121111111011111110550ec87f01ca001114111311121111111055e0db3cc9ed54db31e021393a0f03fe8210b40c268dba8f743157141113810101d700fa40596c211112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c3f1112111311121111111211111110111111100f11100f550dc87f01ca001114111311121111111055e0db3cc9ed54db31e021393a1003fe8210c176e2e3ba8f763157141113810101d700fa40596c211112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c3e1112111311121111111211111110111111100f11100f10ef550cc87f01ca001114111311121111111055e0db3cc9ed54db31393a1104fee0218210a8208e36bae302218210946a98b6ba8f693157141113d33f0131c8018210aff90f5758cb1fcb3fc91112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710461035443012f84201706ddb3cc87f01ca001114111311121111111055e0db3cc9ed54db31e012143a1501fc3157141113810101d700810101d700810101d700d401d0810101d700810101d7003010251024102334341113111511131112111411121111111511111110111411100f11150f0e11140e0d11150d0c11140c0b11150b0a11140a09111509081114080711150706111406051115050411140403111503021114020111160113029c1117db3c3a3a3a3a56125614a05612a05611a08200ccef01c064f2f40f11130f0e11120e0d11110d0c11100c10bf10ae5e2a10ab5535c87f01ca001114111311121111111055e0db3cc9ed54db31393a00a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000004111503f45713820afaf080f8416f24135f037aa904b608f8416f24135f0301a1820083b75318bef2f41112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411144130db3c1113111411131112111311121111111211111110111111100f11100f550e70db3c171d2f047e820090358b085614db3c01f90101f901bdf2f48200c2f88b085613db3c01f90101f901bdf2f48173c68b085612db3c01f90101f901bdf2f4811e928b08561119191918023adb3c01f90101f901bdf2f481137d8b085610db3c01f90101f901bdf2f419190248fa44c88b1118cf16028307a0a9380758cb07cbffc9d020db3cc858cf1601cf16c9d0db3c1a1b0098c801cf168b200008cf16c9d0709421c701b38e2a01d30783069320c2008e1b03aa005323b091a4de03ab0023840fbc9903840fb0811021b203dee8303101e8318307a90c01c8cb07cb07c9d001a08d10105090d1115191d2125292d3135393d4145494d5155595d61656985898d9195999da1a5a9adb1b5b9bdc1c5c9cdd1d5d9dde1e5e8c0c4c8ccd0d4d8dce0e4b57e0c89522d749c2178ae86c21c9d01c009a02d307d307d30703aa0f02aa0712b101b120ab11803fb0aa02523078d72414cf1623ab0b803fb0aa02523078d724cf1623ab05803fb0aa02523078d724cf1603803fb0aa02522078d72413cf1604c2820083b7532bbef2f4531fa88064a904532fa88064a904533fa88064a904534fa88064a9045da022a021a081334b07bb16f2f47054703ebe8f1a245611a88064a9045155a1205611be9130e30d534fbe9134e30d9134e2532ebe9132e30d530dbe1e20222402f81113111b1113561a11131112111a11121111111911111110111811100f11170f0e11160e0d11150d0c111c0c0b0a111a0a091119090811180807111707061116060511150504111c040302111a0201111901111b56195618db3c9b571971571a111711181117925718e21112111a1112111111191111111011181110281f00440f11170f0e11160e0d11150d0c11140c0b11130b0a11120a0911110908111008557702fc1113111a1113111211191112561811121111111811111110111711100f11160f0e11150e0d111b0d0c111a0c0b0a11180a09111709081116080711150706111b0605111a05040311180302111702011116011119561a561cdb3c8e121116a4011115011119a01115111811151114925719e2111211191112111111181111282100541110111711100f11160f0e11150e0d11140d0c11130c0b11120b0a11110a09111009108f107e5566103602fc111311191113111211181112111111171111561611111110111611100f11150f0e111a0e0d11190d0c11180c0b0a11160a0911150908111a08071119070611180605041116040311150302111a0201111901111756155618db3c8e121118a4011115011114a01113111711131114925714e2111211181112111111171111282300521110111611100f11150f0e11140e0d11130d0c11120c0b11110b0a11100a109f108e107d106c555515022e9130e30d533cbe926c22e30d5144a0755005a113a002a0252702f6111311181113111211171112111111161111111011151110561411100f11190f0e11180e0d11170d0c11160c0b0a11190a091118090811170807111607060511190504111804031117030211160201111556155619db3c8e121115a4011116011114a01115111311141113925714e21112111711121111111611112826003c1110111511100f11140f0e11130e0d11120d0c11110c0b11100b10af554902f6111411171114111311161113111211151112111111171111111011161110561511100f11180f0e11170e0d0c11180c0b11170b0a091118090811170807061118060511170504031118030211170201111601201119db3c8e121114a4011115011116a01113111511131114925716e211121115111211111114111128290092531bb9935f0370e07f71c813cb3fc94330146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb007f00281110111311100f11120f0e11110e0d11100d552c01fe30c85612cf165611cf165610cf162fcf162ecf162dcf1652c0cb0752b0cb0752a0cb075290cb075280cb07c9f84270588041015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001111111311111110111211100f11110f0e11100e10df2b0130551cc87f01ca001114111311121111111055e0db3cc9ed543a02fe8efb30c85210cb3f561301cb3f5614fa02c9f84270588041015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001111111311111110111211100f11110f0e11100e10df551cc87f01ca001114111311121111111055e0db3cc9ed54e0203a2d04e482f07488d8501894e44bda39a329ca293e461bc4d93b06bda46f3a4339cab2f3f63abae3022082f0c5f4ed1ab0d491da8eb463aef393dcb6f3f70f03bfdadb9ed03ce082ca27722fbae3022082f0433c5cbf3a412203a138815cca7fccea8573317c174bf1efc26210b9454e7c6ebae302202e30343501fa3033813abef842561201c705917f8e11256eb39a25206ef2d080f842c7059170e2e2f2f4c8f842cf16f82301cb3ff8416f246c31cf16c92281010102206e953059f45a30944133f415e201a4f82382015180a01111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710465e402f012cc87f01ca001114111311121111111055e0db3cc9ed543a01fe30f8416f246c31d31f30228101012259f40d6fa192306ddf8200e69d216eb3f2f4206ef2d080d0fa40d33f81366ff84214c705b313f2f41113111411131112111411121111111411111110111411100f11140f0e11140e0d11140d0c11140c0b11140b0a11140a0911140908111408071114070611140605111405041114043103fe0311140302111402011115011116db3c812213f823011118a18208093a80bb01111701f2f41114d430d0d31f21c0018e4921c0028e1e313939393905d307d307d307d307308200ccef5343a023a022a0c064f2f48e1c01c0039f3807d307308200985321c165f2f4079130e24ba910385502e2103b4a18552009e30d810101393233006631d307fa403021c001933157118e2321c002933157108e1921c00392313f8e1021c00492313e9801c005913d9130e2e2e2e2e201a20111136d206e953059f45a30944133f415e21110111311100f11120f0e11110e0d11100d10cf10be10ad109c108b107a1069105810471036453304c87f01ca001114111311121111111055e0db3cc9ed543a01c23033348200f906f842561101c705f2f4f8416f246c31fa4030f82382015180a01111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106817104644155520c87f01ca001114111311121111111055e0db3cc9ed543a02fe82f0b4b26b3a4915a4e998322bfa9d1de0eed461187c6d53a65fac6a94d79347b7edba8ed930348200c592f842561201c705f2f4f8416f246c31fa40301111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810570610354403c87f01ca001114111311121111111055e0db3cc9ed54e03a3602a42082f038c575c9b696913cfb631dda1cf89b8d35bc3fdc581c1dfa0f0b9217bec565a2bae30282f0a6a153690c8b074c47bd8ed835ad4862e2ba9117825b808cc70516f1f136d0f5bae3025f0f5f05f2c082373801c630355710815a68f8425240c705f2f48200f7f5f823238208093a80a0bcf2f4f8416f246c31fa403011120f11110f0e11100e10df10ce10bd10ac109b108a1079106810576d0710461035441359c87f01ca001114111311121111111055e0db3cc9ed543a02881111111311111110111211100f11110f0e11100e10df551cdb3c38f8416f246c31fa00308200eecf21c200f2f408c87f01ca001114111311121111111055e0db3cc9ed54393a0054817ba3f82327bcf2f4f842561401c705286eb39e917f9a27206ef2d080f842c705e2de8200a5c301f2f401e0011114011113cf16011111cf16500fcf16c8500ecf16500ccf16500acf1608c8810101cf0017810101cf0015810101cf0003c8810101cf0012810101cf00810101cf00c805103446795054206e95307001cb0192cf16e258cf16810101cf0002c8810101cf00f400c901ccc8461350873b00445023810101cf00810101cf00810101cf00c95005ccc95003ccc901ccc901ccc901ccd74263e8');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initFundsDistributor_init_args({ $$type: 'FundsDistributor_init_args', owner, liquidityPool, liquidityLock, animalHelperPool, projectPool, investorsCreatorsPool })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const FundsDistributor_errors = {
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
    4989: { message: `Invalid investors creators pool address` },
    7826: { message: `Invalid project pool address` },
    8723: { message: `Proposal expired` },
    13131: { message: `Distribution error: sum exceeds amount` },
    13935: { message: `Cannot confirm own proposal` },
    15038: { message: `Only admin can propose actions` },
    23144: { message: `Not recovery address` },
    29638: { message: `Invalid animal helper pool address` },
    31651: { message: `Admin functions are temporarily locked` },
    33719: { message: `Amount too small for distribution` },
    36917: { message: `Invalid liquidity pool address` },
    38995: { message: `Invalid lock percentage` },
    42435: { message: `Not authorized` },
    49912: { message: `Invalid liquidity lock address` },
    50578: { message: `Only owner can set recovery address` },
    52463: { message: `Total percentage must be 100%` },
    59037: { message: `Proposal does not exist` },
    61135: { message: `Amount must be positive` },
    63477: { message: `Cooldown period not passed` },
    63750: { message: `Only owner can set temp admin` },
} as const

export const FundsDistributor_errors_backward = {
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
    "Invalid investors creators pool address": 4989,
    "Invalid project pool address": 7826,
    "Proposal expired": 8723,
    "Distribution error: sum exceeds amount": 13131,
    "Cannot confirm own proposal": 13935,
    "Only admin can propose actions": 15038,
    "Not recovery address": 23144,
    "Invalid animal helper pool address": 29638,
    "Admin functions are temporarily locked": 31651,
    "Amount too small for distribution": 33719,
    "Invalid liquidity pool address": 36917,
    "Invalid lock percentage": 38995,
    "Not authorized": 42435,
    "Invalid liquidity lock address": 49912,
    "Only owner can set recovery address": 50578,
    "Total percentage must be 100%": 52463,
    "Proposal does not exist": 59037,
    "Amount must be positive": 61135,
    "Cooldown period not passed": 63477,
    "Only owner can set temp admin": 63750,
} as const

const FundsDistributor_types: ABIType[] = [
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
    {"name":"UpdateLiquidityPoolMessage","header":2925792993,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateAnimalHelperPoolMessage","header":1357296989,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateProjectPoolMessage","header":3020695181,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateInvestorsCreatorsPoolMessage","header":3245794019,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateLiquidityLockMessage","header":562200191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateDistributionRatioMessage","header":2820705846,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liq_percent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"animal_percent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"proj_percent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"inv_creat_percent","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateLockRatioMessage","header":2559550766,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lock_percent","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"EmergencyWithdrawMessage","header":3855890798,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AdminConfig","header":null,"fields":[{"name":"tempAdmin","type":{"kind":"simple","type":"address","optional":true}},{"name":"recoveryAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lockUntil","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"proposalId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pendingProposals","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}}]},
    {"name":"TransactionSummary","header":null,"fields":[{"name":"successCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"failCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalSent","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"FundsDistributor$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityPool","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityLock","type":{"kind":"simple","type":"address","optional":false}},{"name":"animalHelperPool","type":{"kind":"simple","type":"address","optional":false}},{"name":"projectPool","type":{"kind":"simple","type":"address","optional":false}},{"name":"investorsCreatorsPool","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityPercent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"animalHelperPercent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"projectPercent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"investorsCreatorsPercent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lockPercent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minDistributionAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"adminConfig","type":{"kind":"simple","type":"AdminConfig","optional":false}},{"name":"transactionMetrics","type":{"kind":"simple","type":"TransactionSummary","optional":false}}]},
]

const FundsDistributor_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "UpdateLiquidityPoolMessage": 2925792993,
    "UpdateAnimalHelperPoolMessage": 1357296989,
    "UpdateProjectPoolMessage": 3020695181,
    "UpdateInvestorsCreatorsPoolMessage": 3245794019,
    "UpdateLiquidityLockMessage": 562200191,
    "UpdateDistributionRatioMessage": 2820705846,
    "UpdateLockRatioMessage": 2559550766,
    "EmergencyWithdrawMessage": 3855890798,
}

const FundsDistributor_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const FundsDistributor_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const FundsDistributor_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyWithdrawMessage"}},
    {"receiver":"internal","message":{"kind":"text","text":"getConfig"}},
    {"receiver":"internal","message":{"kind":"text","text":"getMetrics"}},
    {"receiver":"internal","message":{"kind":"text","text":"proposeAdminAction"}},
    {"receiver":"internal","message":{"kind":"text","text":"confirmAdminAction"}},
    {"receiver":"internal","message":{"kind":"text","text":"setTempAdmin"}},
    {"receiver":"internal","message":{"kind":"text","text":"setRecoveryAddress"}},
    {"receiver":"internal","message":{"kind":"text","text":"recoveryAccess"}},
    {"receiver":"internal","message":{"kind":"text","text":"updateMinDistributionAmount"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLiquidityPoolMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLiquidityLockMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLockRatioMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateAnimalHelperPoolMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateProjectPoolMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateInvestorsCreatorsPoolMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateDistributionRatioMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class FundsDistributor implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = FundsDistributor_errors_backward;
    public static readonly opcodes = FundsDistributor_opcodes;
    
    static async init(owner: Address, liquidityPool: Address, liquidityLock: Address, animalHelperPool: Address, projectPool: Address, investorsCreatorsPool: Address) {
        return await FundsDistributor_init(owner, liquidityPool, liquidityLock, animalHelperPool, projectPool, investorsCreatorsPool);
    }
    
    static async fromInit(owner: Address, liquidityPool: Address, liquidityLock: Address, animalHelperPool: Address, projectPool: Address, investorsCreatorsPool: Address) {
        const __gen_init = await FundsDistributor_init(owner, liquidityPool, liquidityLock, animalHelperPool, projectPool, investorsCreatorsPool);
        const address = contractAddress(0, __gen_init);
        return new FundsDistributor(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new FundsDistributor(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  FundsDistributor_types,
        getters: FundsDistributor_getters,
        receivers: FundsDistributor_receivers,
        errors: FundsDistributor_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | EmergencyWithdrawMessage | "getConfig" | "getMetrics" | "proposeAdminAction" | "confirmAdminAction" | "setTempAdmin" | "setRecoveryAddress" | "recoveryAccess" | "updateMinDistributionAmount" | UpdateLiquidityPoolMessage | UpdateLiquidityLockMessage | UpdateLockRatioMessage | UpdateAnimalHelperPoolMessage | UpdateProjectPoolMessage | UpdateInvestorsCreatorsPoolMessage | UpdateDistributionRatioMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyWithdrawMessage') {
            body = beginCell().store(storeEmergencyWithdrawMessage(message)).endCell();
        }
        if (message === "getConfig") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "getMetrics") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "proposeAdminAction") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "confirmAdminAction") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "setTempAdmin") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "setRecoveryAddress") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "recoveryAccess") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "updateMinDistributionAmount") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLiquidityPoolMessage') {
            body = beginCell().store(storeUpdateLiquidityPoolMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLiquidityLockMessage') {
            body = beginCell().store(storeUpdateLiquidityLockMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLockRatioMessage') {
            body = beginCell().store(storeUpdateLockRatioMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateAnimalHelperPoolMessage') {
            body = beginCell().store(storeUpdateAnimalHelperPoolMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateProjectPoolMessage') {
            body = beginCell().store(storeUpdateProjectPoolMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateInvestorsCreatorsPoolMessage') {
            body = beginCell().store(storeUpdateInvestorsCreatorsPoolMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateDistributionRatioMessage') {
            body = beginCell().store(storeUpdateDistributionRatioMessage(message)).endCell();
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