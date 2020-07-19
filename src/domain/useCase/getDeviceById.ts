import IGetDeviceByIdPort from '../../ports/input/devices/IGetDeviceByIdPort';
import Device from '../entity/device';
import IDeviceRepository from '../../ports/output/database/IDeviceRepository'


export default class getDeviceByIdUseCase implements IGetDeviceByIdPort {

    constructor(private deviceRepository: IDeviceRepository) {
    }

    public async getDeviceById(id: string): Promise<Device> {
        try {
            return await this.deviceRepository.getDeviceById(id)
        } catch (err) {
            return Promise.reject(err)
        }
    }

}