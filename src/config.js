import Web3 from 'web3';

export const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://91.201.41.52:8545"));
export const NotesContractABI =
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"id","type":"uint256"},{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"removeNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"curId","type":"uint256"},{"name":"newText","type":"bytes32"}],"name":"editNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
export const NotesContractAddress = '0x2c76e27d4d61525ae78b2c1cbd9fad40d7e8655c';
export const NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);

// export const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// export const NotesContractABI =
// [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"id","type":"uint256"},{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"removeNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"curId","type":"uint256"},{"name":"newText","type":"bytes32"}],"name":"editNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
// export const NotesContractAddress = '0x71a35405fedff9ef02a394962e49b54086583c6f';
// export const NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);
