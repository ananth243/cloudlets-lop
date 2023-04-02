import {
    ADDRESS_PARAM,
    AVAILABLE_APPLICATIONS_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants';
import { cpuUpdateSub, storageUpdateSub } from '../coms/subscribers';
import { addServerConnection } from '../connections-manager';
import {
    handleReceiveCpuUpdate,
    handleReceiveStorageUpdate,
} from '../information-manager';
import { ALL_APPLICATIONS_LIST } from '../tasks/constants';
import { DEVICE_ID, SERVER_ADDRESS, SERVER_PORT } from './constants';

const clientSetup = socket => {
    socket.on('connect', () => {
        console.log('conected');
    });

    socket.on('hello', ({ [DEVICE_ID_PARAM]: deviceId }) => {
        addServerConnection(deviceId, socket);
        socket.emit('hello', {
            [DEVICE_ID_PARAM]: DEVICE_ID,
            [ADDRESS_PARAM]: `${SERVER_ADDRESS}:${SERVER_PORT}`,
            [AVAILABLE_APPLICATIONS_PARAM]: ALL_APPLICATIONS_LIST,
        });
    });

    // subscribe to update events
    storageUpdateSub(socket, handleReceiveStorageUpdate);
    cpuUpdateSub(socket, handleReceiveCpuUpdate);
};

export { clientSetup };